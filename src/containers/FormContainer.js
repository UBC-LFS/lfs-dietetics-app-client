import React, { Component } from 'react';

export default class formContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cwl: '',
            firstName: '',
            lastName: '',
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log(event)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    First Name:
                        <input type="text" />
                </label>
                <label>
                    Last Name:
                        <input type="text" />
                </label>
                <label>
                    UBC Student Number:
                        <input type="text" />
                </label>
                <label>
                    Email Address:
                        <input type="text" />
                </label>
                <label>
                    Phone Number:
                        <input type="text" />
                </label>
                <label>
                    Is this your first application to the UBC Dietetics Major?:
                        <input type="radio" name="gender" value="male" checked /> Yes
                        <input type="radio" name="gender" value="female" /> No, second
                        <input type="radio" name="gender" value="other" /> Other (permission note is attached)
                </label>
                <label>
                    Note: Students are only permitted to apply to the program two times, unless written permission is given via
                    the 2018 Dietetics Admissions Special Permission Form (due November 15, 2016). If permission to re-apply has
                    been granted, please include a copy of the signed form with your application).
                </label>

                <input type="submit" value="Submit" />
            </form>
        );
    }
}
