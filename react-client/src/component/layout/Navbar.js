import { Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/authContext';
import { useHistory } from 'react-router-dom';

const Navbar = ({ title }) => {
    const history = useHistory();

    const authContext = useContext(AuthContext);

    const { isAuthenticated, logout, user } = authContext;

    const handleLogout = () => {
        logout();
        history.push('/login');
    }

    const authLinks = (
        <Fragment>
            <li>Hello { user && user.firstName }</li>
            <li>
                <a href="#i" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    ); 

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register' >Register</Link>
            </li>
            <li>
                <Link to='/login' >Login</Link>
            </li>
        </Fragment>
    );


    return (
        <div className="navbar bg-primary">
            <h1>
                <span className="material-icons-outlined" ></span> {title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}                
            </ul>
        </div>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired
}

Navbar.defaultProps = {
    title: 'Health Trac',
    icon: 'material-icons-outlined'
}

export default Navbar