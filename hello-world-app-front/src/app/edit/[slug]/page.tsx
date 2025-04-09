'use client';
import React from 'react';
import api from '@/lib/axios';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditPage() {
    const router = useRouter();
    const { slug } = useParams();
    const [newSlug, setNewSlug] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [favorite, setFavorite] = useState(false);
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const generateSlug = (title: string): string => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '') // 特殊文字を除去
            .replace(/\s+/g, '-')         // スペースをハイフンに
            .replace(/-+/g, '-');         // ハイフン連続も1つに
    };

    useEffect(() => {
        setNewSlug(generateSlug(title));
    }, [title]);

    const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tagInput.trim() !== '') {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!slug || !title || !description || !body) {
            setErrorMessage('すべての項目を入力してください');
            return;
        }

        try {
            await api.get('/sanctum/csrf-cookie');
            const response = await api.put(`/api/articles/${slug}`, {
                slug: newSlug,
                title: title,
                description: description,
                body: body,
                tagList: tags,
                favorited: favorite,
                favoritesCount: favoriteCount
            })
            setSuccessMessage('記事更新成功！');
            setNewSlug('');
            setTitle('');
            setDescription('');
            setBody('');
            setTags([]);
            setTagInput('');
            setFavorite(false);
            setFavoriteCount(0);
            setErrorMessage('');
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } catch (error: any) {
            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('記事の更新に失敗しました');
            }
        }
    }

    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        <ul className="error-messages">
                            {successMessage && <li>{successMessage}</li>}
                            {errorMessage && <li>{errorMessage}</li>}
                        </ul>

                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="form-control form-control-lg"
                                        placeholder="Article Title"
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="form-control"
                                        placeholder="What's this article about?"
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        className="form-control"
                                        rows={8}
                                        placeholder="Write your article (in markdown)"
                                    ></textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleAddTag}           
                                        className="form-control"
                                        placeholder="Enter a tag and press Enter"
                                    />
                                    <div className="tag-list mt-2">
                                        {tags.map(tag => (
                                            <span key={tag} className="tag-default tag-pill">
                                                <i
                                                    className="ion-close-round"
                                                    style={{ cursor: 'pointer', marginRight: '5px' }}
                                                    onClick={() => handleRemoveTag(tag)}
                                                ></i>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </fieldset>
                                <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                                    Publish Article
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}