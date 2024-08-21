import './SignIn.css';
import { SvgFacebook } from '@/components/general/svg/SvgComponent.tsx';
import { ChangeEvent, FormEvent, useState } from 'react';
import LoginInterface from '@/interfaces/login.interface.ts';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth.context.tsx';
import UserInterface from '@/interfaces/user.interface.ts';

const SignIn = () => {
    const navigate: NavigateFunction = useNavigate();
    const { loginAction } = useAuth();
    const [user, setUser] = useState<LoginInterface>({
        name: '',
        password: '',
    });
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        loginAction(user).then((response: UserInterface|null) => {
            if (response) {
                navigate('/');
            } else {
                setError(true);
            }
        });
    };

    const handleClickSignUp = (): void => {
        navigate('/login/sign-up');
    };

    const handleClickShowPassword = (): void => {
        setIsShowPassword((prev) => !prev);
    };
    
    return <>
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-block">
                <input
                    type="text"
                    name="name"
                    placeholder="Email or username"
                    value={user.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-block password">
                <input
                    type={
                        isShowPassword
                            ? 'text'
                            : 'password'
                    }
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />
                <div onClick={handleClickShowPassword} className="show-password">
                    <h5>{ isShowPassword ? 'Hide' : 'Show' }</h5>
                </div>
            </div>
            <button type="submit">Log in</button>
            {
                error ? <h4 className="error">Information is incorrect, please try again !</h4> : null
            }
            <div className="with-facebook">
                <div className="facebook-icon">
                    <SvgFacebook/>
                </div>
                <h4>Log in with Facebook</h4>
            </div>
            <div className="no-account">
                <h4>Don't have an account?</h4>
                <h4 onClick={handleClickSignUp} className="sign-up">Sign up</h4>
            </div>
        </form>
    </>;
};

export default SignIn;