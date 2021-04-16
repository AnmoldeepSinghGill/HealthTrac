import {useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/auth/authContext';
import "../../App.css";
import {withRouter} from "react-router-dom";
import {buildStyles, CircularProgressbar, CircularProgressbarWithChildren} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import RadialSeparators from "./circular-progress-bar/RadialSeparator";

const RiskRateResults = (props) => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;
    const [loading, setLoading] = useState(true);
    const [riskCategory, setRiskCategory] = useState(0);
    const [textColour, setTextColour] = useState('blue');
    const [progressStyles, setProgressStyles] = useState({
        strokeLinecap: "butt",
        textColor: {textColour},
        trailColor: {textColour}
    });
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
            determineTextColor(category);
            console.log(category);
        }).catch(err => {
            setLoading(false);
            console.log(err);
        })
    }

    const onAddNewClick = () => {
        props.history.push({pathname: "/addPatientVitalSigns", id: props.location.id});
    }

    const determineTextColor = (category) => {
        switch (category) {
            case 0:
                setTextColour("green");
                break;
            case 1:
                setTextColour("yellow");
                break;
            case 2:
                setTextColour("yellow");
                break;
            case 3:
                setTextColour("red");
                break;
            case 4:
                setTextColour("red");
                break;
            default:
                setTextColour("blue");
        }
        setProgressStyles({
            strokeLinecap: "butt",
            textColor: {textColour},
            trailColor: {textColour}
        })
    }

    return (
        <div className="card-container">
            <div className="row justify-content-center">
                <h2>Patient's <span className="text-primary">Risk Rate</span></h2>
            </div>
            <div className="row row-padding">
                <div className="col-6 text-center" style={{left: "15%"}}>
                    <div className="progress-bar-custom">
                    <CircularProgressbarWithChildren
                        value={riskCategory}
                        text={`${riskCategory}`}
                        minValue={0}
                        maxValue={4}
                        strokeWidth={5}
                        styles={buildStyles({
                            progressStyles
                        })}
                        key={textColour}
                    >
                        <RadialSeparators
                            count={4}
                            style={{
                                background: "#fff",
                                width: "10px",
                                height: `${5}%`
                            }}
                        />
                    </CircularProgressbarWithChildren>
                    </div>
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
