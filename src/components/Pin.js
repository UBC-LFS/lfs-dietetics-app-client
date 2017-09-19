import React, { Component } from 'react';

export default class Pin extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/get-pin')
            .then(response => response.json())
            .then(x => console.log(x))
    }

   /*  generateid() {
        fetch('http://localhost:8080/api/check-pin', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ uniqueid: pin })
        }).then(() => {
            document.getElementById("pin").innerHTML = pin;
        })
    } */

    render() {
        return (
            <div>
                <h1> Your Pin is </h1>
    
                <p>Click the button to display a random number.</p>
    
                <form>
                    <div>
                        <input className="btn" type="submit" value="Generate PIN" />
                        <input type="text" id='pin' />
                    </div>
                </form>
    
                <p id="pin"></p>
            </div>
        )
    }
};
