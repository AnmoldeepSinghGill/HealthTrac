import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
// import AlertContext from '../../context/alert/alertContext';

const Login = () => {
    const authContext = useContext(AuthContext);
    const history = useHistory();

    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
        }

        if (error === 'Invalid Credentials'){
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated]);

    const [ user, setUser ] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        console.log('Login submit');
        login(user);
    
    }

    return (
        <div className='form-container'>
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required/>
                </div>
                <input type="submit" value="Login" className='btn btn-primary btn-block' />
            </form>
        </div>
    );
};

export default Login;