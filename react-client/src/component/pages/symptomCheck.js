import {useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/auth/authContext';
import axios from "axios";
import {withRouter} from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const SymptomCheck = (props) => {

   

    const OPTIONS = ["Flu", "Cold", "Other"];
    const [symptomCount, setSymptomCount] = useState({
        count: 0,
        
    });

   

    const handleOnSubmit = (event) => {
        event.preventDefault();
            props.history.push({pathname: "/"});
        
    };

    const onChange = (e) => {
        console.log( e.target.checked)
        console.log(e.target.value)

        if(e.target.checked == true){
            var newCount = symptomCount.count + parseInt(e.target.value);
            console.log("added"+newCount);
            setSymptomCount({count:newCount})
        }
        else{
            var lessCount = symptomCount.count - parseInt(e.target.value)
            setSymptomCount({count:lessCount})
        }
       
        
        
        
    }

    let message;
    if(symptomCount.count === 0){
    message =   <h2>Nothing</h2>
    }
    else if(symptomCount.count === 1){
        message =<h2>Allergies</h2>
    }
    else if (symptomCount.count === 2 ||symptomCount.count === 3 ){
        message =<h2>Severe Allergies (see a pharamcist and get some medicene)</h2>
    }

    else if ( symptomCount.count === 6 ||symptomCount.count === 5 || symptomCount.count === 4 ){
        message =<h2>Cold (Take some medicene and call the doctor)</h2>
    }

    else if (symptomCount.count === 7 ){
        message =<h2>Please Go to the hospital  </h2>
    }

    return (
        <div>
            <div className="card-container">
                <div className="row justify-content-center">
                    <h2>Symptom Check</h2>
                </div>
                <Form className="register-form" onSubmit={handleOnSubmit} >
                    <div>
                <input type="checkbox" name="runnyNose" id="runnyNose" value ="0" onChange={onChange}/>
  <label for="runnyNose">Runny Nose</label>
  </div>
  <div>
  <input type="checkbox" name="rash" id="rash" value="1" onChange={onChange}/>
  <label for="rash">Rash</label>
  </div>
<div>
  <input type="checkbox" name="sneezing" id="sneezing" value="2" onChange={onChange} />
  <label for="sneezing">Sneezing</label>
</div>
<div>
  <input type="checkbox" name="soreThroat" id="soreThroat" value="4" onChange={onChange}/>
  <label for="soreThroat">Sneezing</label>
  </div>
        
  <div className="row justify-content-center">
                        <Button variant="primary" type="submit">
                           Home
                        </Button>
                    </div>
                </Form>
                <div className="row justify-content-center row-padding">

                    <h1>
                        Possible Medical Condition and Advice
                    </h1>
                </div>
                <div className="row justify-content-center row-padding">
                    {message}
                </div>
            </div>
        </div>
    );

    }
export default withRouter(SymptomCheck);
