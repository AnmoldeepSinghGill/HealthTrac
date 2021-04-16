import {useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/auth/authContext';
import NurseDashboard from "./nurseDashboard";
import PatientDashboard from "./patientDashboard";

/**
 * Name: Anmoldeep Singh Gill, Mohammad bakir, Alvin Yap, Kharak Kular
 * Student Number: 301044883, 300987420, 301041207, 301042015
 */

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
