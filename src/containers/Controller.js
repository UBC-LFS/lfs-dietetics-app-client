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

    handleSubmit(state) {
        return event => {
            event.preventDefault()
            if (this.validateName(state.firstName) && this.validateName(state.lastName)
                && this.validateNumber(state.id) && this.validateNumber(state.phone)
                && this.validateEmail(state.email) && this.validateEmail(state.verifyEmail)) {
                console.log('yes')
            }
            if (this.validateEmail(state.email)) {
                let FD = new FormData()
                for (let name in state) {
                    FD.append(name, state[name])
                }
                const xhr = new XMLHttpRequest();

                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        console.log(this.responseText);
                    }
                });
<<<<<<< HEAD
                xhr.open("POST", "api/form");
                xhr.setRequestHeader("postman-token", "4c3be312-8b6d-de0f-bfc9-007a8f2eae86");
=======

                xhr.open("POST", "http://localhost:8080/api/form");
>>>>>>> 5b42a165b3a06828eb1d17799a076cd818d439da
                xhr.send(FD);
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