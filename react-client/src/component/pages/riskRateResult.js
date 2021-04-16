import {useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/auth/authContext';
import "../../App.css";
import {withRouter} from "react-router-dom";
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ChangingProgressProvider from "./ChangingProgressProvider";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const RiskRateResults = (props) => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;
    const [loading, setLoading] = useState(true);
    const [riskCategory, setRiskCategory] = useState(0);
    const trainUrl = "http://localhost:3000/run";

    useEffect(() => {
        loadUser();
        console.log(props.location.data);
        getPatientCategory();
    }, []);

    const getPatientCategory = async () => {
        axios.post(trainUrl,props.location.data).then((result)=>{
            setLoading(false);
            console.log(result.data.row1);
            var category =0;
            var value =0;
            for(var x =0;x<result.data.row1.length;x++){
                if(result.data.row1[x]>value){
                    value = result.data.row1[x];
                    category = x;
                }
            }

            setRiskCategory(category);
            console.log(category);
        }).catch(err => {
            setLoading(false);
            console.log(err);
        })
    }

    const onAddNewClick = () => {
        props.history.push({pathname: "/addPatientVitalSigns", id: props.location.id});
    }

    return (
        <div className="card-container">
            <div className="row justify-content-center">
                <h2>Patient's <span className="text-primary">Risk Rate</span></h2>
            </div>
            <div className="row row-padding">
                <div className="col-6 text-center">
                    <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
                        {percentage => (
                            <CircularProgressbar
                                value={percentage}
                                text={`${percentage}%`}
                                styles={buildStyles({
                                    textColor: "blue",
                                    pathColor: "green"
                                })}
                                className="progress-bar-custom"
                            />
                        )}
                    </ChangingProgressProvider>
                </div>
                <div className="col-6 text-center">
                    {loading && (
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    )}
                    <h2>Risk Category</h2>
                    <h3>{riskCategory}</h3>
                </div>
            </div>
        </div>
    );
};

export default withRouter(RiskRateResults);
