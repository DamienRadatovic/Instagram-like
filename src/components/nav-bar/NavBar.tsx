import './NavBar.css';
import { useAuth } from '@/contexts/auth.context.tsx';
import {
    SvgHome,
    SvgHomeSelect,
    SvgInstagram,
    SvgInstagramText,
    SvgReels,
    SvgReelsSelect,
    SvgSearch,
    SvgSearchSelect,
    SvgSendMessage,
} from '@/components/general/svg/SvgComponent.tsx';
import { NavigateFunction, NavLink, useNavigate } from 'react-router-dom';
import { ReactElement, useEffect, useState } from 'react';
import ModalReels from '@/components/general/modal-reels/ModalReels.tsx';
import DropComponent from '@/components/general/drop-component/DropComponent.tsx';

interface NavList {
    path: string,
    svg: ReactElement,
    svgActive?: ReactElement,
    isActive: boolean,
}

const NavBar = () => {
    const navigate: NavigateFunction = useNavigate();
    
    const { user, logOut } = useAuth();
    const [isAccountOpen, setAccountOpen] = useState<boolean>(false);

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);

    const [navList, setNavList] = useState<NavList[]>([
        {
            path: '/home',
            svg: <SvgHome />,
            svgActive: <SvgHomeSelect />,
            isActive: true,
        },
        {
            path: '/search',
            svg: <SvgSearch />,
            svgActive: <SvgSearchSelect />,
            isActive: false,
        },
        {
            path: '/reels',
            svg: <SvgReels />,
            svgActive: <SvgReelsSelect />,
            isActive: false,
        }
    ]);
    
    const handleClickSelectNav = (item: NavList): void => {
        if (item.path === '/reels') {
            setIsOpenModal(true);
        }

        setNavList((prev) => {
            return [...prev].map((elt) => {
                if (elt.path === item.path) {
                    return {
                        ...elt,
                        isActive: true,
                    };
                }
                return {
                    ...elt,
                    isActive: false,
                };
            });
        });
    };

    const closeModal = (): void => {
        setIsOpenModal(false);
        setNavList((prev) => {
            return [...prev].map((elt) => {
                if (elt.path === '/home') {
                    return {
                        ...elt,
                        isActive: true,
                    };
                }
                return {
                    ...elt,
                    isActive: false,
                };
            });
        });
    };

    useEffect(() => {
        const onScroll = () => setOffset(window.scrollY);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return <>
        <div className={`sticky-nav ${offset > 10 ? 'shadow' : ''}`}>
            <div className="nav-bar">
                <div className="nav-title" onClick={() => navigate('/')}>
                    <div className="logo">
                        <SvgInstagram/>
                    </div>
                    <div className="text">
                        <SvgInstagramText/>
                    </div>
                </div>
                <nav>
                    {
                        navList.map((item) => (
                            <div onClick={() => handleClickSelectNav(item)} key={item.path} className="nav-item">
                                {
                                    item.path === '/home' ?
                                        <NavLink hrefLang={item.path === '/home' ? '/home' : ''} to={item.path}>
                                            {item.isActive ? item.svgActive : item.svg}
                                        </NavLink>
                                        :
                                        <a>
                                            {item.isActive ? item.svgActive : item.svg}
                                        </a>
                                }
                            </div>
                        ))
                    }
                </nav>
                <div className="user-information">
                    <div className="send-message">
                        <SvgSendMessage/>
                    </div>
                    <div className="user-card">
                        {
                            user?.image ?
                                <img onClick={() => setAccountOpen(true)} src={user.image} alt="user-image"/>
                                :
                                <img
                                    onClick={() => setAccountOpen(true)}
                                    src='https://cdn.allmylinks.com/prod/User/photo/I/_/-/HSF9tPcmEmHBeXWgDg1gSn6eSHNQJXUS.jpg'
                                    alt="generic-user-image"/>
                        }
                        {
                            isAccountOpen &&
                            <DropComponent onCloseDrop={() => setAccountOpen(false)}>
                                <h3 onClick={logOut} >Log out</h3>
                            </DropComponent>
                        }
                    </div>
                </div>
            </div>
        </div>
        {
            isOpenModal ? <ModalReels onClose={closeModal}/> : null
        }
    </>;
};

export default NavBar;
