'use client';
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
    const { isAuthenticated, username, userImage, logout } = useAuth();
    const router = useRouter();
    const currentPath = usePathname();

    const isActive = (path: string) => currentPath === path;

    return (
        <nav className="navbar navbar-light">
            <div className="container">
                <a className="navbar-brand" href="/">conduit</a>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        {/* <!-- Add "active" className when you're on that page" --> */}
                        <a className={`nav-link ${isActive('/') ? 'active' : ''}`} href="/">Home</a>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <a className={`nav-link ${isActive('/editor') ? 'active' : ''}`} href="/editor"> <i className="ion-compose"></i>&nbsp;New Article </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${isActive('/settings') ? 'active' : ''}`} href="/settings"> <i className="ion-gear-a"></i>&nbsp;Settings </a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${isActive('/profile/eric-simons') ? 'active' : ''}`} href="/profile/eric-simons">
                                    &nbsp;
                                    {userImage && <img src={userImage} className="user-pic" />}
                                    {username}
                                </a>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="nav-link btn btn-link"
                                    onClick={() => {
                                        logout();
                                        router.push('/login');
                                    }}
                                >
                                    Log out
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <a className={`nav-link ${isActive('/login') ? 'active' : ''}`} href="/login">&nbsp;Sign in</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${isActive('/register') ? 'active' : ''}`} href="/register">&nbsp;Sign up</a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    )
}