import { createBrowserRouter, redirect } from 'react-router-dom';
import Layout from '@/components/layout/Layout.tsx';
import { ProtectedRoute } from '@/pages/ProtectedRoute.tsx';
import Page404 from '@/pages/page404/Page404.tsx';
import Home from '@/pages/home/Home.tsx';
import SignIn from '@/components/sign/sign-in/SignIn.tsx';
import SignUp from '@/components/sign/sign-up/SignUp.tsx';
import Login from '@/pages/login/Login.tsx';
import Search from '@/pages/search/Search.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute element={<Layout />} />,
        children: [
            {
                index: true,
                loader: async () => redirect('/home'),
            },
            {
                path: '/home',
                element: <Home />,
            },
            {
                path: '/search',
                element: <Search />,
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
        children: [
            {
                index: true,
                loader: async () => redirect('/login/sign-in'),
            },
            {
                path: '/login/sign-in',
                element: <SignIn />,
            },
            {
                path: '/login/sign-up',
                element: <SignUp />,
            },
        ]
    },
    {
        path: '*',
        element: <Page404 />,
    },
]);
