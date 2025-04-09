'use client';
import React from 'react';
import api from '@/lib/axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setErrorMessage('すべての項目を入力してください');
            return;
          }

        try {
            await api.get('/sanctum/csrf-cookie');
            const response = await api.post('/api/users', {
                name: username,
                email: email,
                password: password,
                password_confirmation: confirmationPassword
            })
            setSuccessMessage('ユーザー登録成功！');
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmationPassword('');
            setErrorMessage('');
            setTimeout(() => {
                router.push('/login');
            }, 1000);
        } catch (error: any) {
            if (error.response?.data?.message) {
              setErrorMessage(error.response.data.message);
            } else {
              setErrorMessage('ユーザー登録に失敗しました');
            }
          }
    }

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <a href="/login">Have an account?</a>
                        </p>

                        <ul className="error-messages">
                            {errorMessage&&<li>{errorMessage}</li>}
                            {successMessage&&<li>{successMessage}</li>}
                        </ul>

                        <form onSubmit={handleSubmit}>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username"
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password" />
                            </fieldset>
                            <fieldset className="form-group">
                                <input
                                    className="form-control form-control-lg"
                                    type="password"
                                    value={confirmationPassword}
                                    onChange={(e) => setConfirmationPassword(e.target.value)}
                                    placeholder="Re-enter Password" />
                            </fieldset>
                            <button
                                type='submit'
                                className="btn btn-lg btn-primary pull-xs-right">
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}