import React, { useState } from "react";

function Contact(props) {
    const [input, setInput] = useState('');

    var templateParams = {
        name: 'Amy',
        notes: 'Check this out!'
    };

    function handleChange (event) {
        const input = event.target.value;
        setInput(input);
    };
    
    function handleSubmit (e) {
        window.emailjs.send('service_vo6cvb8', 'template_1vxc755', templateParams)
        .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
        console.log('FAILED...', error);
        });
    }

        return (
        <form className="test-mailing">
            <h1>Let's see if it works</h1>
            <div>
            <input
                id="test-mailing"
                name="test-mailing"
                onChange={handleChange}
                placeholder="Post some lorem ipsum here"
                required
                style={{width: '100%', height: '150px'}}
            />
            </div>
            <input type="button" value="Submit" className="btn btn--submit" onClick={handleSubmit} />
        </form>
        )
    }

export default Contact