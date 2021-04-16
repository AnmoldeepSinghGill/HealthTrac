import {useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/auth/authContext';
import "../../App.css";
import {withRouter} from "react-router-dom";

const PatientVitalSigns = (props) => {

    useEffect(() => {
        console.log(props.vitalSigns);
    }, []);

    const onAddNewClick = () => {
        props.history.push({pathname: "/addPatientVitalSigns", id: props.location.id});
    }

    return (
        <div className="card-child">
            <div className="row justify-content-center">
                <h2>Patients <span className="text-primary">Vital Signs</span></h2>
            </div>
            <div className="row justify-content-end row-padding">
                    <button className="btn btn-primary" onClick={onAddNewClick}>Add New</button>
            </div>
            {props.vitalSigns && props.vitalSigns.length !== 0 ? (
                <div className="row justify-content-center row-padding">
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Pulse Rate</th>
                            <th>Blood Pressure</th>
                            <th>Weight</th>
                            <th>Temperature</th>
                            <th>Respiratory Rate</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.vitalSigns.map((sign, idx) => (
                            <tr key={idx}>
                                <td>{sign.pulseRate}</td>
                                <td>{sign.bloodPressure}</td>
                                <td>{sign.weight}</td>
                                <td>{sign.temperature}</td>
                                <td>{sign.respiratoryRate}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="row justify-content-center">
                    <h4>No Data Present</h4>
                </div>
            )}

        </div>
    );
};

export default withRouter(PatientVitalSigns);
