import {useContext, useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
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

    const onAddVitalSigns = () => {
        props.history.push({pathname: "/patient/vitalsign", id: props.location.id});
    }

    const onSendEmergencyAlert = () => {
        props.history.push({pathname: "/patient/sendEmergencyAlert"});
    }

    const onCheckSymptoms = () => {
        props.history.push({pathname: "/patient/symptoms"});
    }

    return (
        <div>
            <div className="card-container">
                <div className="container-fluid">
                    <div className="row justify-content-center row-title">
                        <h1>Patient <span className="text-primary">Dashboard</span></h1>
                    </div>
                    <div className="row justify-content-end row-padding" style={{marginBottom: "20px"}}>
                        <button className="btn btn-danger btn-block" onClick={onSendEmergencyAlert}>Send Emergency Alert</button>
                    </div>
                    <div className="row justify-content-center row-padding">
                        <h2>Today's Motivation</h2>
                    </div>
                    <div className="row justify-content-end" style={{marginBottom: "20px"}}>
                        <div className="col-2">
                            <button className="btn btn-warning" onClick={onCheckSymptoms}>Check Symptoms</button>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-primary" onClick={onAddVitalSigns}>Add VitalSigns</button>
                        </div>
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
        </div>
    );
};

export default withRouter(PatientDashboard);
