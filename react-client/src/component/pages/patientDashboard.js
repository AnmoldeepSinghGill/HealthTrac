import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PatientDashboard = (props) => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    useEffect(() => {
        console.log(props);
        // loadUser();
    }, []);

    return (
        <div>
            <h1>Patient Dashboard</h1>
            <Link to="/patient/vitalsign">Add Vital Signs</Link>
        </div>
    );
};

export default PatientDashboard;
