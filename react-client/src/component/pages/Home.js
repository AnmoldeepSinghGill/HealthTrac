import {useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/auth/authContext';
import NurseDashboard from "./nurseDashboard";
import PatientDashboard from "./patientDashboard";

const Home = () => {
    const authContext = useContext(AuthContext);
    const { loadUser, user, loading } = authContext;

    useEffect(()  => {
        loadUser();
    }, []);

    // showing the appropriate dashboard for appropriate account type
    return (
        
        <div>
            {!loading && user && user.accountType === 'PATIENT' ?
                (<PatientDashboard user={user}/>):
                (<NurseDashboard user={user}/>)
            }
        </div>
    );
}

export default Home;
