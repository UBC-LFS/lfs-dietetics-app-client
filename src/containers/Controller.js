import React, { Component } from 'react';
import Pin from '../components/Pin';
import Form from '../components/Form';

export default class AppContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filledForm: true,
        }
    }

    componentWillMount() {
        //get name / id from shib 

        fetch('http://localhost:8080/api/user', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ firstName: 'Patrick', lastName: 'Lin', id: 12345678 })
        })
            .then(response => response.json())
            .then(json => this.setState({ filledForm: json.filledForm }))

    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}> Dietetics Major Application Form 2018 </h1>

                {
                    this.state.filledForm === true ?
                        <Pin /> : <Form />
                }
            </div>
        )
    }
}
