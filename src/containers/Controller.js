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
                let FD = new FormData()
                for (let name in state) { FD.append(name, state[name]) }
                fetch('api/form', {
                    headers: {
                        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                        'Content-Type': 'multipart/form-data'
                    },
                    method: "POST",
                    body: FD
                })
                    .then(response => response.json())
                    .then(json => {
                        console.log(json.filledForm)
                        if (json.filledForm) {
                            this.setState({ filledForm: json.filledForm }, this.findApplicant())
                        }
                    })
            } else {
                let html = '<font color="red"> EMAIL ADDRESS DOES NOT MATCH, PLEASE TRY AGAIN  </font>';
                document.getElementById("error").innerHTML = html;
                window.location.hash = 'error';
            }
            if (state.files) {
                fetch('api/file', {
                    headers: {

                    }
                })
            }
        }
    }

    // handleFileUpload(state) {
    //     return event => {
    //         event.preventDefault()
    //         fetch('api/file', {
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'multipart/form-data'
    //             },
    //             method: "POST",
    //             body: state
    //         }).then(response => response.json())
    //           .then(x => console.log(x))
    //     }
    // }

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
