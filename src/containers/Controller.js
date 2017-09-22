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
        this.checkApp = this.checkApp.bind(this);
    }

    componentWillMount() {
        fetch('/api/login')
            .then(response => response.json())
            .then(json => this.setState({
                filledForm: json.filledForm,
                applicationNumber: json.ApplicationNumber.toString()
            }))
    }

    checkApp() {
        fetch('/api/login')
        .then(response => response.json())
        .then(json => this.setState({
            filledForm: json.filledForm,
            applicationNumber: json.ApplicationNumber.toString()
        }), this.forceUpdate())
    }

    handleSubmit(state) {
        return event => {
            event.preventDefault()
            fetch('/api/form', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(state)
            })
                .then(response => response.json())
                .then(json => this.setState({ filledForm: json.filledForm }, this.checkApp))
        }
    }

    render() {
        return (
            <div className='app-container'>
                <h1 style={{ textAlign: 'center' }}> Dietetics Major Application Form 2018 </h1>
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
