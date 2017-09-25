import React, { Component } from 'react';

export default class FormContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            id: '',
            email: '',
            verifyEmail: '',
            phone: '',
            numOfApp: '',
            aboriginal: '',
            aborId: '',
            date: '',
            files: null
        }
        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setid = this.setid.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setVerifyEmail = this.setVerifyEmail.bind(this);
        this.setPhone = this.setPhone.bind(this);
        this.setNumOfApp = this.setNumOfApp.bind(this);
        this.setAboriginal = this.setAboriginal.bind(this);
        this.setAborId = this.setAborId.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.handleFileSelect = this.handleFileSelect.bind(this);

        //this.validateEmail = this.validateEmail.bind(this);
    }

    componentWillMount() {
        this.setState({ date: new Date().toJSON().slice(0,10).toString() })
    }

    setFirstName(event) {
        this.setState({ firstName: event.target.value })
    }

    setLastName(event) {
        this.setState({ lastName: event.target.value })
    }

    setid(event) {
        this.setState({ id: event.target.value })
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

    setNumOfApp(event) {
        this.setState({ numOfApp: event.target.value })
    }

    setAboriginal(event) {
        this.setState({ aboriginal: event.target.value })
    }

    setAborId(event) {
        this.setState({ aborId: event.target.value })
    }

    handleFileSelect(event) {
        this.setState({ files: event.target.value })
    }

    uploadFile(event) {
        const file = this.state.files
        console.log(file)
    }

    render() {
        return (
            <div>
                <div className="form">
                    <form onSubmit={this.props.handleSubmit(this.state)}>
                        <div>
                            <label>First Name:&nbsp;</label>
                            <input type="text" id="firstName" value={this.state.firstName} onChange={this.setFirstName} required />
                        </div>
                        <div>
                            <label>Last Name:&nbsp;</label>
                            <input type="text" id="lastName" value={this.state.lastName} onChange={this.setLastName} required />
                        </div>
                        <div>
                            <label>UBC Student Number:&nbsp;</label>
                            <input type="number" id="id" value={this.state.id} onChange={this.setid} required />
                        </div>
                        <div>
                            <label>Email Address:&nbsp;</label>
                            <input type="email" id="email" value={this.state.email} onChange={this.setEmail} required />
                        </div>
                        <div>
                            <label>Verify Email Address:&nbsp;</label>
                            <input type="email" id="verifyEmail" value={this.state.verifyEmail} onChange={this.setVerifyEmail} required />
                            <div id='verifyEmail'> </div>
                        </div>
                        <div>
                            <label>Phone Number:&nbsp;</label>
                            <input type="number" id="phone" value={this.state.phone} onChange={this.setPhone} required />
                        </div>
                        <div>
                            <label>Is this your first application to the UBC Dietetics Major?:</label>
                            <fieldset id="NumOfApps">
                                <label><input type="radio" name="appNum" value="yes" checked={this.state.numOfApp === 'yes'} onChange={this.setNumOfApp} /> &nbsp; Yes &nbsp;&nbsp;</label>
                                <label><input type="radio" name="appNum" value="no" checked={this.state.numOfApp === 'no'} onChange={this.setNumOfApp} /> &nbsp; No, second &nbsp;&nbsp;</label>
                                <label><input type="radio" name="appNum" value="other" checked={this.state.numOfApp === 'other'} onChange={this.setNumOfApp} /> &nbsp; Other (permission note is attached) &nbsp;&nbsp;</label>
                            </fieldset>
                            <div>   
                                { this.state.numOfApp === 'other' ?  <input type="file" name="file" ref="file" onChange={this.handleFileSelect}/>
                                                                  : null}
                            </div>
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
                                    awards. <b>Self-identification is optional</b>. If you are an Aboriginal person, we encourage you to self-identify
                                    so that you may benefit from these programs and services. </p>
                            <p> We use the term "Aboriginal" in the spirit of its use in section 35(2) of the Canadian Constitution, to refer inclusively to members of First Nations,
                                    status and non-status, treaty and non-treaty Indians, Métis, and Inuit peoples in Canada, recognizing in doing so that many people may perfer
                                    the terms that are specific and traditional to their communities. </p>
                            <p><b> Aboriginal Self-Identification Questions (Optional):</b> </p>
                            <div>
                                <label>Do you identify yourself as an Aboriginal person of Canada?</label>
                                <fieldset id="aboriginal">
                                    <label><input type="radio" name="abor" value="yes" checked={this.state.aboriginal === 'yes'} onChange={this.setAboriginal} /> &nbsp; Yes &nbsp;&nbsp;</label>
                                    <label><input type="radio" name="abor" value="no" checked={this.state.aboriginal === 'no'} onChange={this.setAboriginal} /> &nbsp; No &nbsp;&nbsp;</label>
                                </fieldset>
                            </div>
                            <div>
                                <label>Do you identify with one or more of the following:</label>
                                <fieldset id="aborId">
                                    <label><input type="radio" name="idAbor" value="First Nation" checked={this.state.aborId === 'First Nation'} onChange={this.setAborId} /> &nbsp; First Nations &nbsp;&nbsp;</label>
                                    <label><input type="radio" name="idAbor" value="Métis" checked={this.state.aborId === 'Métis'} onChange={this.setAborId} /> &nbsp; Métis &nbsp;&nbsp;</label>
                                    <label><input type="radio" name="idAbor" value="Inuit" checked={this.state.aborId === 'Inuit'} onChange={this.setAborId} /> &nbsp; Inuit &nbsp;&nbsp;</label>
                                </fieldset>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <br /><br />
                            <input className="btn" type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
