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
        this.validateName = this.validateName.bind(this);
        this.validateNumber = this.validateNumber.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.errorOutput = this.errorOutput.bind(this);
    }

    componentWillMount() {
        this.findApplicant();
    }

    findApplicant() {
        fetch('api/login')
            .then(response => response.json())
            .then(json => this.setState({
                filledForm: json.filledForm,
                applicationNumber: json.ApplicationNumber.toString()
            }), this.forceUpdate())
    }

    validateName(name) {
        const verify = /^[A-Za-z\s]+$/
        return verify.test(name)
    }

    validateNumber(num) {
        const verify = /^\d+$/
        return verify.test(num)
    }

    validateEmail(email) {
        const verify = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return verify.test(email)
    }

    errorOutput(state) {
        const errorList = [];
        if (!this.validateName(state.firstName)) {
            errorList.push(' FIRST NAME')
        }
        if (!this.validateName(state.lastName)) {
            errorList.push(' LAST NAME')
        }
        if (!this.validateNumber(state.id)) {
            errorList.push(' STUDENT NUMBER')
        }
        if (!this.validateNumber(state.phone)) {
            errorList.push(' PHONE NUMBER SHOULD ONLY CONTAIN NUMBERS')
        }
        if (!this.validateEmail(state.email) || !this.validateEmail(state.verifyEmail)) {
            errorList.push(' INVALID EMAIL')
        }
        if (!state.email.toUpperCase() === state.verifyEmail.toUpperCase()) {
            errorList.push(' EMAILS DO NOT MATCH')
        }
        return errorList;
    }

    handleSubmit(state) {
        return event => {
            event.preventDefault()
            if (this.validateName(state.firstName) && this.validateName(state.lastName)
                && this.validateNumber(state.id) && this.validateNumber(state.phone)
                && this.validateEmail(state.email) && this.validateEmail(state.verifyEmail)
                && state.email.toUpperCase() === state.verifyEmail.toUpperCase()
            ) {
                let FD = new FormData()
                for (let name in state) {
                    FD.append(name, state[name])
                }
                const xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", () => {
                    if (this.readyState === 4 && this.status === 200) {
                        console.log(this.responseText);
                    }
                });
                xhr.open("POST", "api/form");
                xhr.send(FD);
            } else {
                const err = this.errorOutput(state)
                const html = `<font color="red"> THE FOLLOWING FIELDS ARE INVALID: ${err} <br> PLEASE TRY AGAIN  </font>`;
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
