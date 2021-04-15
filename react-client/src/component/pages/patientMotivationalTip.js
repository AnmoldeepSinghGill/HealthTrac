import {useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/auth/authContext';
import "../../App.css";
import {withRouter} from "react-router-dom";

const PatientMotivationalTips = (props) => {

    useEffect(() => {
        console.log(props.tips);
    }, []);

    return (
            <div className="card-child">
                    <div className="row justify-content-center">
                        <h2>Patients Motivational Tip</h2>
                    </div>
                {props.tips && props.tips.length !== 0 ? (
                    <div className="row justify-content-center">
                        <h4>Type: {props.tips[0].type}</h4>
                        <h4>Link: <iframe width="100%" height="500px"
                                          src={props.tips[0].link}>
                        </iframe></h4>
                    </div>
                ) : (
                    <div className="row justify-content-center">
                        <h4>No MotivationalTips Set</h4>
                    </div>
                )}

            </div>
    );
};

export default withRouter(PatientMotivationalTips);
