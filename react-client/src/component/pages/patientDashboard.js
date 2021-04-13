import { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const PatientDashboard = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    useEffect(() => {
        // loadUser();
    }, []);

    return (
        <div>
            <h1>Patient Dashboard</h1>
        </div>
    );
};

export default PatientDashboard;
