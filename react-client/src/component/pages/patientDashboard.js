import { useContext, useEffect } from 'react';
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
        </div>
    );
};

export default PatientDashboard;
