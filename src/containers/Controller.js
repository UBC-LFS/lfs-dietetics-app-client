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
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const json = JSON.parse(xhr.response)
                if (json.type === 'render')
                    this.setState({
                        filledForm: json.filledForm,
                        applicationNumber: json.ApplicationNumber.toString()
                    }, this.forceUpdate())
            }
        }
        xhr.open("get", "api/login")
        xhr.send()
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
        if (!this.validateName(state.currentInstitution)) {
            errorList.push(' CURRENT INSTITUTION')
        }
        if (!this.validateNumber(state.id)) {
            errorList.push(' STUDENT NUMBER')
        }
        if (!this.validateNumber(state.phone)) {
            errorList.push(' PHONE NUMBER (NUMBERS ONLY)')
        }
        if (!this.validateEmail(state.email) || !this.validateEmail(state.verifyEmail) 
            || !this.validateEmail(state.verifyUBCEmail) || !this.validateEmail(state.UBCEmail)) {
            errorList.push(' EMAIL')
        }
        if (state.verifyUBCEmail.toUpperCase() !== state.UBCEmail.toUpperCase()) {
            errorList.push(' EMAILS DO NOT MATCH')
        }
        if (state.email.toUpperCase() !== state.verifyEmail.toUpperCase()) {
            errorList.push(' EMAILS DO NOT MATCH')
        }
        return errorList;
    }

    handleSubmit(state) {
        console.log(state)
        return event => {
            event.preventDefault()
            if (this.validateName(state.firstName) && this.validateName(state.lastName)
                && this.validateName(state.currentInstitution)
                && this.validateNumber(state.id) && this.validateNumber(state.phone)
                && this.validateEmail(state.email) && this.validateEmail(state.verifyEmail)
                && this.validateEmail(state.UBCEmail) && this.validateEmail(state.verifyUBCEmail)
                && state.email.toUpperCase() === state.verifyEmail.toUpperCase()
                && state.UBCEmail.toUpperCase() === state.verifyUBCEmail.toUpperCase()
            ) {
                let FD = new FormData()
                for (let name in state) {
                    FD.append(name, state[name])
                }
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        const json = JSON.parse(xhr.response)
                        if (json.type === 'render') {
                            this.findApplicant()
                        }
                    } else if (xhr.readyState === 4 && xhr.status === 404) {
                        const json = JSON.parse(xhr.response)
                        if (json.type === 'error') {
                            if (typeof json.msg.code !== 'undefined') {
                                alert("Error! File size limit is 10MB. Please upload a smaller file.");
                            } else {
                                alert("Error! Only the following file types are accepted: PDF, DOC, DOCX, JPEG");
                            }
                        }
                        if (json.type === 'sql-error') { 
                            alert("Applicantion Error, please contact it@landfood.ubc.ca for assistance");
                        }
                    }
                }
                xhr.open("POST", "api/form");
                xhr.send(FD);
            } else {
                const err = this.errorOutput(state).join(',')
                console.log(err)
                alert('There is a problem with the following: ' + err)
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
