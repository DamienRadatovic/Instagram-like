import './Login.css';
import { useAuth } from '@/contexts/auth.context.tsx';
import { NavigateFunction, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SvgInstagram } from '@/components/general/svg/SvgComponent.tsx';
import SignFooter from '@/components/sign/sign-footer/SignFooter.tsx';
import Img1 from '@/assets/img/img-1.jpg';
import Img2 from '@/assets/img/img-2.jpg';
import Img3 from '@/assets/img/img-3.jpg';
import Img4 from '@/assets/img/img-4.jpg';
import Img5 from '@/assets/img/img-5.jpg';
import Img6 from '@/assets/img/img-6.jpg';
import DialogInformation from '@/components/general/dialog-information/DialogInformation.tsx';

const Login = () => {
    const navigate: NavigateFunction = useNavigate();
    const location = useLocation();
    const { isAuthenticated, isRegisterSuccess } = useAuth();
    const [locationTitle, setLocationTitle] = useState<string>('');

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    });

    useEffect(() => {
        if (location.pathname === '/login/sign-up') {
            setLocationTitle('Register');
        } else {
            setLocationTitle('Log In');
        }
    }, [location]);

    return <>
        <div className="login-container">
            <div className="login-images">
                <img src={Img1} alt="img-1"/>
                <img src={Img2} alt="img-2"/>
                <img src={Img3} alt="img-3"/>
                <img src={Img4} alt="img-4"/>
                <img src={Img5} alt="img-5"/>
                <img src={Img6} alt="img-6"/>
                <img src={Img6} alt="img-7"/>
                <img src={Img6} alt="img-8"/>
            </div>
            <div className="login-top">
                <div className="svg-instagram">
                    <SvgInstagram/>
                </div>
                <div className="login-title">
                    <h2>{locationTitle}</h2>
                    <h4>Welcome to Instagram</h4>
                </div>
                <Outlet/>
            </div>
            <SignFooter/>
            {
                isRegisterSuccess ?
                    <DialogInformation>
                        Registration successful, please log in
                    </DialogInformation> : null
            }
        </div>
    </>;
};

export default Login;
