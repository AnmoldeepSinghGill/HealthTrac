import {useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/auth/authContext';
import axios from "axios";
import {withRouter} from "react-router-dom";
import {Form, Button} from "react-bootstrap";

const SymptomCheck = (props) => {


    const OPTIONS = ["Flu", "Cold", "Other"];
    const [symptomCount, setSymptomCount] = useState({
        count: 0,

    });


    const goToDashboard = (event) => {
        event.preventDefault();
        props.history.push({pathname: "/"});

    };

    const onChange = (e) => {
        console.log(e.target.checked)
        console.log(e.target.value)

        if (e.target.checked === true) {
            var newCount = symptomCount.count + parseInt(e.target.value);
            console.log("added" + newCount);
            setSymptomCount({count: newCount})
        } else {
            var lessCount = symptomCount.count - parseInt(e.target.value)
            setSymptomCount({count: lessCount})
        }


    }

    let message;
    if (symptomCount.count === 0) {
        message = <h2>Nothing</h2>
    } else if (symptomCount.count === 1) {
        message = <h2 className="text-warning">Allergies</h2>
    } else if (symptomCount.count === 2 || symptomCount.count === 3) {
        message = <h2 className="text-danger">Severe Allergies (see a pharamcist and get some medicene)</h2>
    } else if (symptomCount.count === 6 || symptomCount.count === 5 || symptomCount.count === 4) {
        message = <h2 className="text-warning">Cold (Take some medicene and call the doctor)</h2>
    } else if (symptomCount.count === 7) {
        message = <h2 className="text-danger">Please Go to the hospital </h2>
    }

    return (
        <div>
            <div className="card-container">
                <div className="row justify-content-center">
                    <h2><span className="text-primary">Symptom Check</span></h2>
                </div>
                <div className="row justify-content-center">
                    <h5>Specify Your Symptoms and know the possible medical condition you may have</h5>
                </div>
                <Form className="register-form">
                    <div className="row justify-content-center row-padding">
                        <div className="col-1 text-right">
                            <input type="checkbox" name="runnyNose" id="runnyNose" value="0" onChange={onChange}/>
                        </div>
                        <div className="col-2 no-padding">
                            <label htmlFor="runnyNose">Runny Nose</label>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-1 text-right">
                            <input type="checkbox" name="rash" id="rash" value="1" onChange={onChange}/>
                        </div>
                        <div className="col-2 no-padding">
                            <label htmlFor="rash">Rash</label>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-1 text-right">
                            <input type="checkbox" name="sneezing" id="sneezing" value="2" onChange={onChange}/>
                        </div>
                        <div className="col-2 no-padding">
                            <label htmlFor="sneezing">Sneezing</label>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-1 text-right">
                            <input type="checkbox" name="soreThroat" id="soreThroat" value="4" onChange={onChange}/>
                        </div>
                        <div className="col-2 no-padding">
                            <label htmlFor="soreThroat">Sneezing</label>
                        </div>
                    </div>
                </Form>
                <div className="row justify-content-center row-padding">

                    <h2 className="text-primary">
                        Possible Medical Condition and Advice
                    </h2>
                </div>
                <div className="row justify-content-center row-padding">
                    {message}
                </div>

                <div className="row justify-content-center row-padding">
                    <Button variant="primary" onClick={goToDashboard}>
                        Back To Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );

}
export default withRouter(SymptomCheck);
