import {useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/auth/authContext';
import axios from "axios";
import {withRouter} from "react-router-dom";
import PatientMotivationalTips from "./patientMotivationalTip";
import PatientVitalSigns from "./patientVitalSigns";
import PatientClinicalData from "./patientClinicalData";
import PatientEmergencyAlerts from "./patientEmergencyAlerts";

const PatientDetails = (props) => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;
    const [motivationalTips, setMotivationalTips] = useState([]);
    const [vitalSigns, setVitalSigns] = useState([]);
    const [clinicalData, setClinicalData] = useState([]);
    const [emergencyAlerts, setEmergencyAlerts] = useState([]);
    const [patientDetails, setPatientDetails] = useState({
        firstName: '',
        lastname: '',
        phoneNumber: '',
        id: '',
        email: '',
        city: '',
        address: ''
    });
    const apiUrl = "http://localhost:3000/api/patientDetails/";

    useEffect(() => {
        console.log(patientDetails);
        console.log(props.location.id);
        loadUser();
        getPatientById();
    }, []);

    const getPatientById = async () => {
        if (props.location.id) {
            await axios.get(apiUrl + props.location.id).then((result) => {
                console.log(result.data);
                setMotivationalTips(result.data.motivationalTips);
                setPatientDetails(result.data.account);
                setVitalSigns(result.data.vitalSigns);
                setClinicalData(result.data.clinicalData);
                setEmergencyAlerts(result.data.emergencyAlerts);
            }).catch((error) => {
                console.log("error in fetching nurses:", error);
            });
        } else {
            props.history.push({pathname: "/"});
        }
    };

    return (
        <div>
            <div className="card-container" style={{backgroundColor: "#ececec"}}>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <h2><span className="text-primary">Patients Details</span></h2>
                    </div>
                    <div style={{fontSize: "22px"}}>
                    <div className="row">
                        <div className="col-2">

                        </div>
                        <div className="col-4 text-right label-bold">
                            Name
                        </div>
                        <div className="col-4">
                            {patientDetails.firstName} {patientDetails.lastName}
                        </div>
                        <div className="col-2">

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-right label-bold">
                            Email
                        </div>
                        <div className="col-6">
                            {patientDetails.email}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-right label-bold">
                            Address
                        </div>
                        <div className="col-6">
                            {patientDetails.address}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-right label-bold">
                            City
                        </div>
                        <div className="col-6">
                            {patientDetails.city}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 text-right label-bold">
                            Phone Number
                        </div>
                        <div className="col-6">
                            {patientDetails.phoneNumber}
                        </div>
                    </div>
                    </div>
                    <div className="row">
                        <PatientEmergencyAlerts emergencyAlerts={emergencyAlerts}/>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <PatientMotivationalTips tips={motivationalTips}/>
                        </div>
                        <div className="col-6">
                            <PatientVitalSigns vitalSigns={vitalSigns}/>
                        </div>
                    </div>
                <div className="row">
                        <PatientClinicalData clinicalData={clinicalData} id={props.location.id}/>
                </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(PatientDetails);
