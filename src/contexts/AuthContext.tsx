import React, { ReactNode, useState, useContext } from 'react';
import { useIsomorphicEffect } from '@hooks/useIsomorphicEffect';
import { getCookie, deleteCookie } from 'cookies-next';
import Router from 'next/router';
const AuthContext = React.createContext({});

export const AuthProvider: any = ({ children }: { children: ReactNode }) => {
    const isomorphicEffect = useIsomorphicEffect();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadUserFromCookies = async () => {
        const token = getCookie('token');
        if (token) {
            let res: any = await fetch(`/api/user/me`, {
                method: 'GET',
            });

            res = await res.json();
            setUser(await res.data);
        }
        setLoading(false);
    };

    isomorphicEffect(() => {
        loadUserFromCookies();
    }, []);

    const login = async (id: number, password: string) => {
        setLoading(true);
        let res: any;
        try {
            if (!id) {
                throw new Error('Nomor identitas wajib diisi.');
            } else if (!password) {
                throw new Error('Password wajib diisi.');
            }

            res = await fetch(`/api/auth/signin`, {
                method: 'POST',
                body: JSON.stringify({
                    student_id: Number(id),
                    password: password,
                }),
            });
            res = await res.json();
            if (res.status) {
                Router.reload();
            } else {
                throw new Error(res.message);
            }
            setLoading(false);
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    };

    const logout = () => {
        deleteCookie('token');
        setUser(null);
        Router.reload();
    };

    const register = async (id: number, name: string, password: string) => {
        setLoading(true);
        let res: any;
        try {
            if (!id) {
                throw new Error('Nomor identitas wajib diisi.');
            } else if (!name) {
                throw new Error('Nama wajib diisi.');
            } else if (!password) {
                throw new Error('Password wajib diisi.');
            }

            res = await fetch(`/api/auth/signup`, {
                method: 'POST',
                body: JSON.stringify({
                    student_id: Number(id),
                    name: name,
                    password: password,
                }),
            });

            res = await res.json();
            if (res.status) {
                Router.reload();
            } else {
                throw new Error(res.message);
            }
            setLoading(false);
        } catch (error: any) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                login,
                loading,
                logout,
                register,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
