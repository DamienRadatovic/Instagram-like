import './SignUp.css';
import { SvgFacebook } from '@/components/general/svg/SvgComponent.tsx';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth.context.tsx';
import { ChangeEvent, FormEvent, useState } from 'react';
import RegisterInterface from '@/interfaces/register.interface.ts';
import UserInterface from '@/interfaces/user.interface.ts';

const SignUp = () => {
    const navigate: NavigateFunction = useNavigate();
    const { registerAction } = useAuth();
    const [user, setUser] = useState<RegisterInterface>({
        email: '',
        username: '',
        password: '',
    });
    const [verificationPassword, setVerificationPassword] = useState<string>('');
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowPasswordVerification, setIsShowPasswordVerification] = useState<boolean>(false);
    const [isShowErrorPassword, setIsErrorShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'password-verification') {
            if (value !== user.password) {
                setIsErrorShowPassword(true);
            } else {
                setIsErrorShowPassword(false);
            }
            setVerificationPassword(value);
        } else {
            if (name === 'password') {
                if (value !== verificationPassword) {
                    setIsErrorShowPassword(true);
                } else {
                    setIsErrorShowPassword(false);
                }
            }
            setUser({
                ...user,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        if (!isShowErrorPassword) {
            registerAction(user).then((response: UserInterface|null) => {
                if (response) {
                    navigate('/login/sign-in');
                } else {
                    setError(true);
                }
            });
        }
    };

    const handleClickSignIn = (): void => {
        navigate('/login/sign-in');
    };

    const handleClickShowPassword = (): void => {
        setIsShowPassword((prev) => !prev);
    };

    const handleClickShowPasswordVerification = (): void => {
        setIsShowPasswordVerification((prev) => !prev);
    };

    return <>
        <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-block">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-block email">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={user.username}
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
                    minLength={5}
                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}"
                    title="The password must contain at least 5 characters, including at least one capital letter, one number and one special character [@$!%*?&]."
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />
                <div onClick={handleClickShowPassword} className="show-password">
                    <h5>{isShowPassword ? 'Hide' : 'Show'}</h5>
                </div>
            </div>
            {
                isShowErrorPassword ? <h5 className="error-password">Please enter the same password</h5> : null
            }
            <div className="form-block password-verification">
                <input
                    type={
                        isShowPasswordVerification
                            ? 'text'
                            : 'password'
                    }
                    minLength={5}
                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}"
                    title="The password must contain at least 5 characters, including at least one capital letter, one number and one special character [@$!%*?&]."
                    name="password-verification"
                    placeholder="Verification Password"
                    value={verificationPassword}
                    onChange={handleChange}
                    required
                />
                <div onClick={handleClickShowPasswordVerification} className="show-password">
                    <h5>{isShowPasswordVerification ? 'Hide' : 'Show'}</h5>
                </div>
            </div>
            <button type="submit">Register</button>
            {
                error ? <h4 className="error">Information is incorrect, please try again !</h4> : null
            }
            <div className="with-facebook">
                <div className="facebook-icon">
                    <SvgFacebook/>
                </div>
                <h4>Register with Facebook</h4>
            </div>
            <div className="no-account">
                <h4>Do you have an account?</h4>
                <h4 onClick={handleClickSignIn} className="sign-up">Sign in</h4>
            </div>
        </form>
    </>;
};

export default SignUp;