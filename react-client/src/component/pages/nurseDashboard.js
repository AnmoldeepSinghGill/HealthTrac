import { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const NurseDashboard = () => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    useEffect(() => {
        // loadUser();
    }, []);

    return (
        <div>
            <h1>Nurse Dashboard</h1>
        </div>
    );
};

export default NurseDashboard;
