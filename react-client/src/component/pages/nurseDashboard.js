import {useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/auth/authContext';
import "../../App.css";
import axios from "axios";

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
                                <th>{patient.firstName} {patient.lastName}</th>
                                <th>{patient.email}</th>
                                <th>{patient.address}</th>
                                <th>{patient.city}</th>
                                <th>{patient.phoneNumber}</th>
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

export default NurseDashboard;
