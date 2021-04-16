import {useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/auth/authContext';
import axios from "axios";
import {withRouter} from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const AddPatientMotivationalTip = (props) => {
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;
    const [motivationalTip, setMotivationalTip] = useState({
        videoLink: '',
        type: 'video'
    });
    const apiUrl = "http://localhost:3000/api/addMotivationalTip/";

    useEffect(() => {
        console.log(props.location.id);
        loadUser();
    }, []);

    const addPatientMotivationalTip = async () => {
        if (props.location.id) {
            await axios.post(apiUrl + props.location.id, motivationalTip).then((result) => {
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
            addPatientMotivationalTip();
        } else {
            props.history.push({pathname: "/"});
        }
    };

    const onChange = (e) => {
        setMotivationalTip({ ...motivationalTip, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <div className="card-container">
                <div className="row justify-content-center">
                    <h2><span className="text-primary">Add Motivational Tip</span> for Patient</h2>
                </div>
                <Form className="register-form" onSubmit={handleOnSubmit}>
                    <Form.Group controlId="age">
                        <Form.Label>Video Link</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Video Link"
                            name="videoLink"
                            onChange={onChange}
                            value={motivationalTip.videoLink}
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
    );
};

export default withRouter(AddPatientMotivationalTip);
