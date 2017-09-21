import React from 'react';
import PropTypes from 'prop-types';

const AppNumber = (props) => {
    return (
        <div className='box'>
            <h1 style={{ textAlign: 'center' }}> Your Application Number is {props.applicationNumber}</h1>
        </div>
    )
};

AppNumber.propTypes = {
    applicationNumber: PropTypes.string.isRequired,
};

export default AppNumber;
