import './Layout.css';
import NavBar from '@/components/nav-bar/NavBar.tsx';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return <>
        <div className="layout">
            <NavBar/>
            <div className="content-layout">
                <Outlet />
            </div>
        </div>
    </>;
};

export default Layout;
