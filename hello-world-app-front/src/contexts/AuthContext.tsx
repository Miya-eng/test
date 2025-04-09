
// 復習

'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/axios';
import { ParamValue } from 'next/dist/server/request/params';

type Article = {
    id: number;
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[] | null;
    createdAt: string;
    updatedAt: string;
    favorited: boolean | null;
    favoritesCount: number | null;
    author_id: number;
    author: {
        name: string;
        img?: string;
      };
}

type AuthContextType = {
    isAuthenticated: boolean;
    userId: number | null;
    username: string | null;
    userImage: string | null;
    articles: Article[];
    setArticles: (articles: Article[]) => void;
    login: (user: { id: number; username: string; userImage?: string }) => void;
    logout: () => void;
    deleteArticle: (slug: string) => void;
};

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    userId: null,
    username: null,
    userImage: null,
    articles: [],
    setArticles: () => { },
    login: () => { },
    logout: () => { },
    deleteArticle: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [userImage, setUserImage] = useState<string | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);

    const login = ({ id, username, userImage }: { id: number; username: string; userImage?: string }) => {
        setIsAuthenticated(true);
        setUserId(id);
        setUsername(username);
        setUserImage(userImage || null);
    };

    const logout = async () => {
        await api.post('/api/users/logout');
        setIsAuthenticated(false);
        setUsername(null);
        setUserImage(null);
        setArticles([]);
    };

    const deleteArticle = async (slug: string) => {
        try {
            await api.delete(`/api/articles/${slug}`);
            alert('記事を削除しました');
            setArticles(articles.filter((article) => article.slug !== slug));
        } catch (err) {
            console.error('記事削除エラー:', err);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/api/user');
                login({
                    id: res.data.id,
                    username: res.data.name,
                    userImage: res.data.img,
                });
            } catch (err) {
                setIsAuthenticated(false);
            }
        };

        const fetchArticles = async () => {
            try {
                const res = await api.get('/api/articles');
                setArticles(res.data.data.article);
            } catch (err) {
                console.error('記事取得エラー:', err);
            }
        };

        fetchUser();
        fetchArticles();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                userId,
                username,
                userImage,
                login,
                logout,
                articles,
                setArticles,
                deleteArticle
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
