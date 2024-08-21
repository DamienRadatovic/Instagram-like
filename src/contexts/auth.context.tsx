import { createContext, ReactNode, useContext, useState } from 'react';
import { getUserInformation, loginUser, registerUser } from '@/api/user.api.ts';
import UserInterface from '@/interfaces/user.interface.ts';
import LoginInterface from '@/interfaces/login.interface.ts';
import RegisterInterface from '@/interfaces/register.interface.ts';

interface AuthContextType {
    user: UserInterface|null,
    token: string|null,
    isAuthenticated: boolean,
    isRegisterSuccess: boolean,
    loginAction: (data: LoginInterface) => Promise<UserInterface|null>,
    registerAction: (data: RegisterInterface) => Promise<UserInterface|null>,
    logOut: () => void,
    getToken: () => void,
    fetchUserInformation: () => void,
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false);
    const [user, setUser] = useState<UserInterface|null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return Boolean(localStorage.getItem('site'));
    });
    const [token, setToken] = useState<string>(localStorage.getItem('site') || '');

    const getToken = () => {
        const token = localStorage.getItem('site');

        if (token !== null) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    };
    
    const registerAction = async (data: RegisterInterface): Promise<UserInterface|null> => {
        try {
            return registerUser(data).then((response) => {
                setIsRegisterSuccess(true);
                return response;
            });
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const loginAction = async (data: LoginInterface): Promise<UserInterface|null> => {
        try {
            return loginUser(data).then((response) => {
                setUser(response.user);
                setToken(response.token);
                localStorage.setItem('site', response.token);
                setIsAuthenticated(true);

                return user;
            });
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const logOut = (): void => {
        setUser(null);
        setToken('');
        localStorage.removeItem('site');
        setIsAuthenticated(false);
    };

    const fetchUserInformation = (): void => {
        getUserInformation().then((response: UserInterface) => {
            setUser(response);
        });
    };
    
    return <>
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated,
            isRegisterSuccess,
            loginAction,
            registerAction,
            logOut,
            getToken,
            fetchUserInformation,
        }}>
            { children }
        </AuthContext.Provider>
    </>;
};

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};