import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simulate loading user from local storage
    useEffect(() => {
        const storedUser = localStorage.getItem('feast_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password, role = 'customer') => {
        // Mock API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const userData = {
                    id: '123',
                    name: 'Test User',
                    email,
                    role: role, // 'customer', 'owner', 'admin', 'delivery'
                    avatar: 'https://github.com/shadcn.png'
                };
                setUser(userData);
                localStorage.setItem('feast_user', JSON.stringify(userData));
                resolve(userData);
            }, 800);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('feast_user');
    };

    const value = {
        user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
