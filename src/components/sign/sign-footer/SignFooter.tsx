import './SignFooter.css';
import { SvgAppleStore, SvgPlayStore } from '@/components/general/svg/SvgComponent.tsx';

const SignFooter = () => {
    return <>
        <div className="sign-footer">
            <div className="information">
                <h5>Help</h5>
                <h5>Press</h5>
                <h5>Privacy</h5>
                <h5>Terms</h5>
                <h5>Language</h5>
            </div>
            <div className="get-app">
                <h5>Get the app.</h5>
                <div className="store-container">
                    <div className="apple store">
                        <SvgAppleStore/>
                    </div>
                    <div className="play store">
                        <SvgPlayStore/>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <h5>© {new Date().getFullYear()} Instagram from Facebook</h5>
            </div>
        </div>
    </>;
};

export default SignFooter;