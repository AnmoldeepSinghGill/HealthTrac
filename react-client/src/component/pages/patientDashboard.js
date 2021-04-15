import {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import "../../App.css";
import axios from "axios";

const PatientDashboard = (props) => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;
    const [motivationalTip, setMotivationalTip] = useState({
        id: '',
        videoLink: '',
        type: 'video'
    });
    const motivationalTipUrl = "http://localhost:3000/api/getLatestMotivationalTip";

    useEffect(() => {
        console.log(props);
        loadUser();
        getLatestMotivationalTip();
    }, []);

    const getLatestMotivationalTip = async () => {
        await axios.get(motivationalTipUrl).then((result) => {
            if (result.data) {
                setMotivationalTip(result.data);
            }
        }).catch((error) => {
            console.log("error in fetching nurses:", error);
        });
    }

    return (
        <div>
            <h1>Patient Dashboard</h1>
            <div className="card-container">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <h2>Today's Motivation</h2>
                    </div>
                    {motivationalTip.videoLink !== '' ? (
                        <div className="row justify-content-center">
                            <iframe width="100%" height="500px" key={motivationalTip.id}
                                    src={motivationalTip.videoLink}>
                            </iframe>
                        </div>
                    ) : (
                        <div className="row justify-content-center">
                            <h2>Not Motivational Tip Found</h2>
                        </div>
                    )}
                </div>
            </div>
            <Link to="/patient/vitalsign">Add Vital Signs</Link>
        </div>
    );
};

export default PatientDashboard;
