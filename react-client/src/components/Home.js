
import { withRouter } from 'react-router-dom';

import React, { Component }  from 'react';

function Home(props)
{


    return (
        <div>
            <h2> Express - React with CRUD Operations</h2>
            <p>React front-end calls Express REST API to add, 
            list, update, or delete a student, create a course, and add a course to a student.</p>
        </div>
    );

}

export default withRouter(Home);