import React from 'react'
import PropTypes from 'prop-types'

const AppNumber = (props) => {
  return (
         props.applicationNumber !== ''
            ? <div className='box'>
              <h1 style={{ textAlign: 'center' }}> Your Application Number is {props.applicationNumber}</h1>
            </div>
            : <div />
  )
}

AppNumber.propTypes = {
  applicationNumber: PropTypes.string.isRequired
}

export default AppNumber
