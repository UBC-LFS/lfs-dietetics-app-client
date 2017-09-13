import React from 'react';

const PinGenerator = (props) => {

    function generateid() {
        let pin = ("18-" + Math.floor(Math.random()*90000));
        fetch('http://localhost:8080/check', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({uniqueid: pin})
        }).then(() => {
            document.getElementById("pin").innerHTML = pin;
            })
    }
    
    return (
        <div>
        <p>Click the button to display a random number.</p>
        
        <button onClick={generateid}>Generate</button>
        <p id="pin"></p>
        </div>
    );
  };
  
  export default PinGenerator;