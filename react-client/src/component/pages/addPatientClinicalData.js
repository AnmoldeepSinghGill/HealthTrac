import {useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/auth/authContext';
import axios from "axios";
import {withRouter} from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const AddPatientClinicalData = (props) => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;
    const [clinicalData, setClinicalData] = useState({
        age: 0,
        sex: 0,
        cp: 0,
        trestbps: 0,
        chol: 0,
        fbs: 0,
        restecg: 0,
        thalach: 0,
        exang: 0,
        oldpeak: 0,
        slope: 0,
        ca: 0,
        thal: 0,
        riskCategory:0
        
    });
    const apiUrl = "http://localhost:3000/api/addClinicalData/";
    const trainUrl = "http://localhost:3000/run";

    useEffect(() => {
        console.log(props.location.id);
        loadUser();
    }, []);

    const getPatientCategory = () => {
        axios.post(trainUrl,clinicalData).then((result)=>{
            console.log(result.data.row1);
            var category =0;
            var value =0;
            for(var x =0;x<result.data.row1.length;x++){
                if(result.data.row1[x]>value){
                    value = result.data.row1[x];
                    category = x;
                }
            }

           clinicalData.riskCategory = category;
           console.log(clinicalData.riskCategory);
        })
    }

    const addPatientClinicalData = async () => {
        if (props.location.id) {
            await axios.post(apiUrl + props.location.id, clinicalData).then((result) => {
                console.log(result.data);
                props.history.push({pathname: "/showDetails", id : props.location.id});
            }).catch((error) => {
                props.history.push({pathname: "/showDetails", id: props.location.id});
                console.log("error in fetching nurses:", error);
            });
        } else {
            props.history.push({pathname: "/"});
        }
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (props.location.id) {
            getPatientCategory();
            addPatientClinicalData();
        } else {
            props.history.push({pathname: "/"});
        }
    };

    const onChange = (e) => {
        setClinicalData({ ...clinicalData, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <div className="card-container">
                <div className="row justify-content-center">
                <h2><span className="text-primary">Add Clinical Data</span> for Patient</h2>
                </div>
                <div className="row justify-content-center">
                <Form className="register-form" onSubmit={handleOnSubmit} style={{width: "30%"}}>
                    <Form.Group controlId="age">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="number"
                            step="any"
                            placeholder="Enter Age"
                            name="age"
                            onChange={onChange}
                            value={clinicalData.age}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="sex">
                        <Form.Label>Sex</Form.Label>
                        <Form.Control
                            type="number"
                            step="any"
                            placeholder="Enter Sex"
                            name="sex"
                            onChange={onChange}
                            value={clinicalData.sex}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="cp">
                        <Form.Label>CP</Form.Label>
                        <Form.Control
                            type="number"
                            step="any"
                            placeholder="Enter CP"
                            name="cp"
                            onChange={onChange}
                            value={clinicalData.cp}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="trestbps">
                        <Form.Label>trestbps</Form.Label>
                        <Form.Control
                            type="number"
                            step="any"
                            placeholder="Enter trestbps"
                            name="trestbps"
                            onChange={onChange}
                            value={clinicalData.trestbps}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="chol">
                        <Form.Label>chol</Form.Label>
                        <Form.Control
                            type="number"
                            step="any"
                            placeholder="Enter chol"
                            name="chol"
                            onChange={onChange}
                            value={clinicalData.chol}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="fbs">
                        <Form.Label>fbs</Form.Label>
                        <Form.Control
                            type="number"
                            step="any"
                            placeholder="Enter fbs"
                            name="fbs"
                            onChange={onChange}
                            value={clinicalData.fbs}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="restecg">
                        <Form.Label>restecg</Form.Label>
                        <Form.Control
                            type="number"
                            step="any"
                            placeholder="Enter restecg"
                            name="restecg"
                            onChange={onChange}
                            value={clinicalData.restecg}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="thalach">
                        <Form.Label>thalach</Form.Label>
                        <Form.Control
                            type="number"
                            step="any"
                            placeholder="Enter thalach"
                            name="thalach"
                            onChange={onChange}
                            value={clinicalData.thalach}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="exang">
                        <Form.Label>exang</Form.Label>
                        <Form.Control
                            type="number"
                            step="any"
                            placeholder="Enter exang"
                            name="exang"
                            onChange={onChange}
                            value={clinicalData.exang}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="oldpeak">
                        <Form.Label>oldpeak</Form.Label>
                        <Form.Control
                            type="number"
                            step="any"
                            placeholder="Enter oldpeak"
                            name="oldpeak"
                            onChange={onChange}
                            value={clinicalData.oldpeak}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="slope">
                        <Form.Label>slope</Form.Label>
                        <Form.Control
                            type="number"
                            step="any"
                            placeholder="Enter slope"
                            name="slope"
                            onChange={onChange}
                            value={clinicalData.slope}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="ca">
                        <Form.Label>ca</Form.Label>
                        <Form.Control
                            type="number"
                            step="any"
                            placeholder="Enter ca"
                            name="ca"
                            onChange={onChange}
                            value={clinicalData.ca}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="thal">
                        <Form.Label>thal</Form.Label>
                        <Form.Control
                            type="number"
                            step="any"
                            placeholder="Enter thal"
                            name="thal"
                            onChange={onChange}
                            value={clinicalData.thal}
                            required
                        />
                    </Form.Group>
                
                    <div className="row justify-content-center">
                        <Button variant="primary" type="submit">
                            SAVE
                        </Button>
                    </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default withRouter(AddPatientClinicalData);
