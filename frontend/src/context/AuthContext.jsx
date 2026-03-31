import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCurrentUser, loginUser, registerUser } from '../api/authApi';
import { clearAuthData, getStoredUser, getToken, setAuthData } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getStoredUser());
    const [token, setToken] = useState(getToken());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const bootstrapAuth = async () => {
            const existingToken = getToken();

            if (!existingToken) {
                setLoading(false);
                return;
            }

            try {
                const response = await getCurrentUser();
                const currentUser = response.data.user;
                setUser(currentUser);
                setToken(existingToken);
            } catch (error) {
                clearAuthData();
                setUser(null);
                setToken(null);
            } finally {
                setLoading(false);
            }
        };

        bootstrapAuth();
    }, []);

    const login = async (payload) => {
        const response = await loginUser(payload);
        const authData = response.data;

        setAuthData({
            token: authData.token,
            user: authData.user,
        });

        setUser(authData.user);
        setToken(authData.token);

        return response;
    };

    const signup = async (payload) => {
        const response = await registerUser(payload);
        const authData = response.data;

        setAuthData({
            token: authData.token,
            user: authData.user,
        });

        setUser(authData.user);
        setToken(authData.token);

        return response;
    };

    const logout = () => {
        clearAuthData();
        setUser(null);
        setToken(null);
    };

    const value = useMemo(
        () => ({
            user,
            token,
            loading,
            isAuthenticated: !!token && !!user,
            login,
            signup,
            logout,
        }),
        [user, token, loading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
};