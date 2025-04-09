'use client';
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, username, userImage, logout, articles } = useAuth();

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link" href="">Your Feed</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="">Global Feed</a>
                </li>
              </ul>
            </div>

            {/* 記事一覧 */}
            {articles.length > 0 ? (
              articles.map((article) => (
                <div key={article.id} className="article-preview">
                  <div className="article-meta">
                    <a href={`/profile/${article.author.name}`}>
                      {article.author.img && <img src={article.author.img} alt={article.author.name || ''} />}
                    </a>
                    <div className="info">
                      <a href={`/profile/${article.author.name}`} className="author">{article.author.name}</a>
                      <span className="date">{new Date().toDateString()}</span>
                    </div>
                    <button className="btn btn-outline-primary btn-sm pull-xs-right">
                      <i className="ion-heart"></i> {article.favoritesCount || 0}
                    </button>
                  </div>
                  <a href={`/article/${article.slug}`} className="preview-link">
                    <h1>{article.title}</h1>
                    <p>{article.description}</p>
                    <span>Read more...</span>
                    <ul className="tag-list">
                      {Array.isArray(article.tagList) &&
                        article.tagList.map((tag: string, idx: number) => (
                          <li key={idx} className="tag-default tag-pill tag-outline">{tag}</li>
                        ))}
                    </ul>
                  </a>
                </div>
              ))
            ) : (
              <p>No articles available.</p>
            )}

            {isAuthenticated ? (
              <div>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  onClick={() => router.push('/edit')}
                >
                  Create
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  onClick={() => router.push('/login')}
                >
                  Create
                </button>
              </div>
            )
            }

            <ul className="pagination">
              <li className="page-item active">
                <a className="page-link" href="">1</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="">2</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                <a href="" className="tag-pill tag-default">programming</a>
                <a href="" className="tag-pill tag-default">javascript</a>
                <a href="" className="tag-pill tag-default">emberjs</a>
                <a href="" className="tag-pill tag-default">angularjs</a>
                <a href="" className="tag-pill tag-default">react</a>
                <a href="" className="tag-pill tag-default">mean</a>
                <a href="" className="tag-pill tag-default">node</a>
                <a href="" className="tag-pill tag-default">rails</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
