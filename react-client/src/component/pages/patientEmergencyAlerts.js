import {useEffect} from 'react';
import "../../App.css";
import {withRouter} from "react-router-dom";

const PatientEmergencyAlerts = (props) => {

    useEffect(() => {
        console.log(props.emergencyAlerts);
    }, []);


    return (
        <div className="card-child" style={{width: "100%"}}>
            <div className="row justify-content-center">
                <h2>Patients <span className="text-danger">Emergency Alerts</span></h2>
            </div>
            {props.emergencyAlerts && props.emergencyAlerts.length !== 0 ? (
                <div className="row justify-content-center row-padding">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Reason</th>
                            <th>Date Created</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.emergencyAlerts.map((alert, idx) => (
                            <tr key={idx}>
                                <td>{alert.reason}</td>
                                <td>{alert.date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="row justify-content-center">
                    <h4>No Alerts Present</h4>
                </div>
            )}

        </div>
    );
};

export default withRouter(PatientEmergencyAlerts);
