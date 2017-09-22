import React, { Component } from 'react';
import AppNumber from '../components/AppNumber';
import Form from '../components/Form';

export default class AppContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filledForm: false,
            applicationNumber: '',
        }
        this.findApplicant = this.findApplicant.bind(this);
    }

    componentWillMount() {
        this.findApplicant();
    }

    findApplicant() {
        console.log(process.env.npm_package_config_dev)
        fetch('api/login')
            .then(response => response.json())
            .then(json => this.setState({
                filledForm: json.filledForm,
                applicationNumber: json.ApplicationNumber.toString()
            }), this.forceUpdate())
    }

    handleSubmit(state) {
        return event => {
            event.preventDefault()
            if (state.email === state.verifyEmail) {
                fetch( process.env.url + 'api/form', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(state)
                })
                    .then(response => response.json())
                    .then(json => {
                        if (json.filledForm) {
                            this.setState({ filledForm: json.filledForm }, this.findApplicant())
                        }
                    })
            } else {
                let html = '<font color="red"> EMAIL ADDRESS DOES NOT MATCH, PLEASE TRY AGAIN  </font>';
                document.getElementById("error").innerHTML = html;
                window.location.hash = 'error';
            }
        }
    }

    render() {
        return (
            <div className='app-container'>
                <h1 style={{ textAlign: 'center' }}> Dietetics Major Application Form 2018 </h1>
                <div style={{ textAlign: 'center' }} id='error'></div>
                {this.state.filledForm === true ? (
                    <AppNumber applicationNumber={this.state.applicationNumber} />
                ) : (
                        <Form handleSubmit={this.handleSubmit.bind(this)} />
                    )
                }
            </div>
        )
    }
}
