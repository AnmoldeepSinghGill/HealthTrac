import { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import "../../App.css";

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
            <div className="card-container">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <h2>Today's Motivation</h2>
                    </div>
                    <div className="row justify-content-center">
                        <iframe width="100%" height="500px"
                                src="https://www.youtube.com/embed/ZXsQAXx_ao0">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
