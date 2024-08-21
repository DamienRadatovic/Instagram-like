import UserInterface from '../interfaces/user.interface.ts';
import { localUser, users } from '../static.data.ts';
import LoginInterface from '../interfaces/login.interface.ts';
import RegisterInterface from '@/interfaces/register.interface.ts';

const getUserInformation = async (): Promise<UserInterface> => {
    return { ...localUser };
};

const getPublicUserById = async (userId: string): Promise<UserInterface> => {
    return [...users].filter((elt) => elt.id === userId)[0];
};

const loginUser = async (data: LoginInterface): Promise<{ user: UserInterface, token: string }> => {
    console.log('Data for login', data);
    return {
        user: { ...localUser },
        token: 'Mon-Super-Token',
    };
};

const registerUser = async (data: RegisterInterface): Promise<UserInterface> => {
    console.log('Data for register', data);
    return { ...localUser };
};

export {
    getUserInformation,
    loginUser,
    registerUser,
    getPublicUserById,
};