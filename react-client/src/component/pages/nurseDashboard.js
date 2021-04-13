import { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const NurseDashboard = (props) => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    useEffect(() => {
        console.log(props);
        // loadUser();
    }, []);

    return (
        <div>
            <h1>Nurse Dashboard</h1>
        </div>
    );
};

export default NurseDashboard;
