import {useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/auth/authContext';
import "../../App.css";
import {withRouter} from "react-router-dom";

const PatientClinicalData = (props) => {

    useEffect(() => {
        console.log(props.clinicalData);
    }, []);

    const onAddNewClick = () => {
        props.history.push({pathname: "/addPatientClinicalData", id: props.location.id});
    }

    return (
        <div className="card-clinical">
            <div className="row justify-content-center">
                <h2>Patients Clinical Data</h2>
            </div>
            <div className="row justify-content-end">
                <button className="btn btn-success" onClick={onAddNewClick}>Add New Clinical Data</button>
            </div>
            {props.clinicalData && props.clinicalData.length !== 0 ? (
                <div className="row justify-content-center row-padding">
                    <table className="table table-bordered table-responsive">
                        <thead>
                        <tr>
                        <th>Age</th>
                        <th>Sex</th>
                        <th>CP</th>
                        <th>trestbps</th>
                        <th>chol</th>
                        <th>fbs</th>
                        <th>restecg</th>
                        <th>thalach</th>
                        <th>exang</th>
                        <th>oldpeak</th>
                        <th>slope</th>
                        <th>ca</th>
                        <th>thal</th>
                        <th>riskCategory</th>
                        <th>Created On</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.clinicalData.map((data, idx) => (
                            <tr key={idx}>
                                <td>{data.age}</td>
                                <td>{data.sex}</td>
                                <td>{data.cp}</td>
                                <td>{data.trestbps}</td>
                                <td>{data.chol}</td>
                                <td>{data.fbs}</td>
                                <td>{data.restecg}</td>
                                <td>{data.thalach}</td>
                                <td>{data.exang}</td>
                                <td>{data.oldpeak}</td>
                                <td>{data.slope}</td>
                                <td>{data.ca}</td>
                                <td>{data.thal}</td>
                                <td>{data.riskCategory}</td>
                                <td>{data.createdOn}</td>
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

export default withRouter(PatientClinicalData);
