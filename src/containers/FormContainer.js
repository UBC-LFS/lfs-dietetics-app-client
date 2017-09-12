import React, { Component } from 'react';

export default class formContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.validateEmail = this.validateEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setFirstName(event) {
        this.setState({ firstName: event.target.value })
    }

    setLastName(event) {
        this.setState({ lastName: event.target.value })
    }

    setUbcSN(event) {
        this.setState({ ubcSN: event.target.value })
    }

    setEmail(event) {
        this.setState({ email: event.target.value })
    }

    setVerifyEmail(event) {
        this.setState({ verifyEmail: event.target.value })
    }

    setPhone(event) {
        this.setState({ phone: event.target.value })
    }

    setApp(event) {
        this.setState({ numOfApp: event.target.value })
    }

    setAboriginal(event) {
        this.setState({ aboriginal: event.target.value })
    }

    setAborId(event) {
        this.setState({ aborId: event.target.value })
    }

    validateEmail() {
        if (this.state.email !== '' && this.state.verifyEmail !== '') {
            if (this.state.email !== this.state.verifyEmail) {
                let html = '<font color="red"> Email address does not match  </font>';
                document.getElementById("verifyEmail").innerHTML = html;
            } else {
                document.getElementById("verifyEmail").innerHTML = '';
            }
        } else {
            document.getElementById("verifyEmail").innerHTML = '';
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log(this.state)
    }

    componentDidMount() {
        //fetch('http://localhost:8080/')
        //.then(response => response.json(s))
        //.then(x => console.log(x))

    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}> Dietetics Major Application Form 2018 </h1>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label>First Name:&nbsp;</label>
                            <input type="text" id="firstName" value={this.state.firstName} onChange={this.setFirstName.bind(this)} />
                        </div>
                        <div>
                            <label>Last Name:&nbsp;</label>
                            <input type="text" id="lastName" value={this.state.lastName} onChange={this.setLastName.bind(this)} />
                        </div>
                        <div>
                            <label>UBC Student Number:&nbsp;</label>
                            <input type="number" id="ubcSN" value={this.state.ubcSN} onChange={this.setUbcSN.bind(this)} />
                        </div>
                        <div>
                            <label>Email Address:&nbsp;</label>
                            <input type="email" id="email" value={this.state.email} onChange={this.setEmail.bind(this)} />
                        </div>
                        <div>
                            <label>Verify Email Address:&nbsp;</label>
                            <input type="email" id="verifyEmail" value={this.state.verifyEmail} onChange={this.setVerifyEmail.bind(this)} />
                            <div id='verifyEmail'> </div>
                        </div>
                        <div>
                            <label>Phone Number:&nbsp;</label>
                            <input type="number" id="phone" value={this.state.phone} onChange={this.setPhone.bind(this)} />
                        </div>
                        <div>
                            <label>Is this your first application to the UBC Dietetics Major?:</label>
                            <fieldset id="NumOfApps">
                                <input type="radio" name="appNum" value="yes" checked={this.state.numOfApp === 'yes'} onChange={this.setApp.bind(this)} /> &nbsp; Yes &nbsp;&nbsp;
                                <input type="radio" name="appNum" value="no" checked={this.state.numOfApp === 'no'} onChange={this.setApp.bind(this)} /> &nbsp; No, second &nbsp;&nbsp;
                                <input type="radio" name="appNum" value="other" checked={this.state.numOfApp === 'other'} onChange={this.setApp.bind(this)} /> &nbsp; Other (permission note is attached) &nbsp;&nbsp;
                            </fieldset>
                            <br />
                        </div>
                        <div>
                            <p><b>Note:</b> Students are only permitted to apply to the program two times, unless written permission is given via
                                the 2018 Dietetics Admissions Special Permission Form (due <b>November 15, 2016</b>). If permission to re-apply has
                                been granted, please include a copy of the signed form with your application).</p>
                        </div>
                        <div className="box">
                            <p><b>Aboriginal Student Self-Identification - Optional Question</b> </p>
                            <p> UBC is dedicated to supporting Aboriginal student success. The university has developed a wide variety of programs
                                    and student serives for Aboriginal students, including academic programs, admission policies, housing and financial
                                    awards. <b>Self-identification is optional</b>. If you are an Aboiginal person, we encourage you to self-identify
                                    so that you may benefit from these programs and services. </p>
                            <p> We use the term "Aboriginal" in the spirit of its use in section 35(2) of the Canadian Constitution, to refer inclusively to members of First Nations,
                                    status and non-status, treaty and non-treaty Indians, Métis, and Inuit peoples in Canada, recognizing in doing so that many people may perfer
                                    the terms that are specific and traditional to their communities. </p>
                            <p><b> Aboriginal Self-Identification Questions (Optional):</b> </p>
                            <div>
                                <label>Do you identify yourself as an Aboriginal person of Canada?</label>
                                <fieldset id="aboriginal">
                                    <input type="radio" name="abor" value="yes" checked={this.state.aboriginal === 'yes'} onChange={this.setAboriginal.bind(this)} /> &nbsp; Yes &nbsp;&nbsp;
                                    <input type="radio" name="abor" value="no" checked={this.state.aboriginal === 'no'} onChange={this.setAboriginal.bind(this)} /> &nbsp; No &nbsp;&nbsp;
                                </fieldset>
                            </div>
                            <div>
                                <label>Do you identify with one or more of the following:</label>
                                <fieldset id="aborId">
                                    <input type="radio" name="idAbor" value="First Nation" checked={this.state.aborId === 'First Nation'} onChange={this.setAborId.bind(this)} /> &nbsp; First Nations &nbsp;&nbsp;
                                    <input type="radio" name="idAbor" value="Métis" checked={this.state.aborId === 'Métis'} onChange={this.setAborId.bind(this)} /> &nbsp; Métis &nbsp;&nbsp;
                                    <input type="radio" name="idAbor" value="Inuit" checked={this.state.aborId === 'Inuit'} onChange={this.setAborId.bind(this)} /> &nbsp; Inuit &nbsp;&nbsp;
                                </fieldset>
                            </div>
                        </div>
                        <div>
                            <br />
                            <input className="btn" type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
