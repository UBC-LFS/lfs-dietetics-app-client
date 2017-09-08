import React, { Component } from 'react';

export default class formContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
        }
    }

    handleEmailVerify(event) {
        if (this.state.email !== '') {
            if (this.state.email !== event.target.value) {
                console.log("hi")
            }
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log(event)
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}> Dietetics Major Application Form 2018 </h1>
                <div className="form">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label>First Name: </label>
                            <input type="text" id="firstName" />
                        </div>
                        <div>
                            <label>Last Name:</label>
                            <input type="text" id="lastName" />
                        </div>
                        <div>
                            <label>UBC Student Number:</label>
                            <input type="number" id="UBC_SN" />
                        </div>
                        <div>
                            <label>Email Address:</label>
                            <input type="email" id="email1" value={this.state.value} />
                        </div>
                        <div>
                            <label>Verify Email Address:</label>
                            <input type="email" id="email2" value={this.state.value} onChange={this.handleEmailVerify} />
                        </div>
                        <div>
                            <label>Phone Number:</label>
                            <input type="number" id="phone" />
                        </div>
                        <div>
                            <label>Is this your first application to the UBC Dietetics Major?:</label>
                            <fieldset id="NumOfApps">
                                <input type="radio" name="appNum" value="yes" checked /> Yes
                                <input type="radio" name="appNum" value="no" /> No, second
                                <input type="radio" name="appNum" value="other" /> Other (permission note is attached)
                            </fieldset>
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
                                    <input type="radio" name="abor" value="yes" checked /> Yes
                                    <input type="radio" name="abor" value="no" /> No
                                </fieldset>
                            </div>
                            <div>
                                <label>Do you identify with one or more of the following:</label>
                                <fieldset id="aborId">
                                    <input type="radio" name="idAbor" value="firstNation" checked /> First Nations
                                    <input type="radio" name="idAbor" value="Metis" /> Métis
                                    <input type="radio" name="idAbor" value="Inuit" /> Inuit
                                </fieldset>
                            </div>
                        </div>
                        <div>
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
