import {useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/auth/authContext';
import "../../App.css";
import axios from "axios";
import {withRouter} from "react-router-dom";

const NurseDashboard = (props) => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;
    const [ patientsList, setPatientsList ] = useState([]);
    const apiUrl = "http://localhost:3000/api/getPatientsForNurse";

    useEffect(() => {
        console.log(props);
        loadUser();
        getAllPatients();
    }, []);

    const getAllPatients = async () => {
        await axios.get(apiUrl).then((result) => {
            setPatientsList(result.data);
        }).catch((error) => {
            console.log("error in fetching nurses:", error);
        });
    };

    const handleViewVitals = (id) => {
        props.history.push({pathname: "/showDetails",
        id,});
    }

    return (
        <div>
            <h1>Nurse Dashboard</h1>
            <div className="card-container">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <h2>Patients List</h2>
                    </div>
                    <div className="row justify-content-center">
                        <table className="table table-responsive">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Phone Number</th>
                            </tr>
                            {patientsList.map((patient, idx) => (
                                <tr key={idx}>
                                <td>{patient.account.firstName} {patient.account.lastName}</td>
                                <td>{patient.account.email}</td>
                                <td>{patient.account.address}</td>
                                <td>{patient.account.city}</td>
                                <td>{patient.account.phoneNumber}</td>
                                <td><button className="btn btn-success" onClick={() => {handleViewVitals(patient.id)}}>
                                    View Details
                                </button></td>
                                </tr>
                            ))}
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(NurseDashboard);
