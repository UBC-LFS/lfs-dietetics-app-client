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
        fetch('http://localhost:8080/api/login')
            .then(response => response.json())
            .then(json => this.setState({
                filledForm: json.filledForm,
                applicationNumber: json.ApplicationNumber.toString()
            }), this.forceUpdate())
    }

    handleSubmit(state) {
        return event => {
            event.preventDefault()
            fetch('http://localhost:8080/api/form', {
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
        }
    }

    handleFileUpload(state) {
        return event => {
            event.preventDefault()
            fetch('http://localhost:8080/api/form', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                method: "POST",
                body: state
            }).then(response => response.json())
              .then(x => console.log(x))
        }
    }

    render() {
        return (
            <div className='app-container'>
                <h1 style={{ textAlign: 'center' }}> Dietetics Major Application Form 2018 </h1>
                {this.state.filledForm === true ? (
                    <AppNumber applicationNumber={this.state.applicationNumber} />
                ) : (
                        <Form handleSubmit={this.handleSubmit.bind(this)} handleFileUpload={this.handleFileUpload.bind(this)}/>
                    )
                }
            </div>
        )
    }
}
