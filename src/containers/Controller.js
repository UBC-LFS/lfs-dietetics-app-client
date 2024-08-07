/* global XMLHttpRequest, FormData, alert */
import React, { Component } from 'react'
import AppNumber from '../components/AppNumber'

/* Application closed for 2024 */
import Form from '../components/Form'


export default class AppContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filledForm: false,
      applicationNumber: ''
    }
    this.findApplicant = this.findApplicant.bind(this)
    this.validateName = this.validateName.bind(this)
    this.validateNumber = this.validateNumber.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.validateDate = this.validateDate.bind(this)
    this.errorOutput = this.errorOutput.bind(this)
  }

  componentWillMount () {
    this.findApplicant()
  }

  findApplicant () {
    const xhr = new XMLHttpRequest("http://localhost:10080/")
    xhr.onload = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const json = JSON.parse(xhr.response)
        if (json.type === 'render') {
          this.setState({
            filledForm: json.filledForm,
            applicationNumber: json.ApplicationNumber.toString()
          }, this.forceUpdate())
        }
      }
    }
    xhr.open('get', 'api/login')
    xhr.send()
  }

  validateName (name) {
    const verify = /^[A-Za-z\s]+$/
    return verify.test(name)
  }

  validateNumber (num) {
    const verify = /^\d+$/
    return verify.test(num)
  }

  validateEmail (email) {
    const verify = /\S+@\S+\.\S+/
    return verify.test(email)
  }

  validateDate (date) {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!date.match(regEx)) return false;
    const d = new Date(date);
    if(!d.getTime()) return false;
    return d.toISOString().slice(0,10) === date;
  }

  errorOutput (state) {
    const errorList = []
    if (!this.validateName(state.firstName)) {
      errorList.push(' FIRST NAME')
    }
    if (!this.validateName(state.lastName)) {
      errorList.push(' LAST NAME')
    }
    if (!this.validateName(state.currentInstitution)) {
      errorList.push(' CURRENT INSTITUTION')
    }
    if (!this.validateNumber(state.id)) {
      errorList.push(' STUDENT NUMBER')
    }
    if (!this.validateNumber(state.phone)) {
      errorList.push(' PHONE NUMBER (NUMBERS ONLY)')
    }
    if (!this.validateEmail(state.email) || !this.validateEmail(state.verifyEmail) ||
      !this.validateEmail(state.verifyUBCEmail) || !this.validateEmail(state.UBCEmail)) {
      errorList.push(' EMAIL')
    }
    if (state.verifyUBCEmail.toUpperCase() !== state.UBCEmail.toUpperCase()) {
      errorList.push(' UBC EMAILS DO NOT MATCH')
    }
    if (state.email.toUpperCase() !== state.verifyEmail.toUpperCase()) {
      errorList.push(' EMAILS DO NOT MATCH')
    }
    if (!this.validateDate(state.birthday)) {
      errorList.push(' BIRTHDAY SHOULD BE IN THE FOLLOWING FORMAT YYYY-MM-DD')
    }
    return errorList
  }

  handleSubmit (state) {
    return event => {
      event.preventDefault()
      if (this.validateName(state.firstName) && this.validateName(state.lastName) &&
        this.validateName(state.currentInstitution) &&
        this.validateNumber(state.id) && this.validateNumber(state.phone) &&
        this.validateEmail(state.email) && this.validateEmail(state.verifyEmail) &&
        this.validateEmail(state.UBCEmail) && this.validateEmail(state.verifyUBCEmail) &&
        state.email.toUpperCase() === state.verifyEmail.toUpperCase() &&
        state.UBCEmail.toUpperCase() === state.verifyUBCEmail.toUpperCase() && this.validateDate(state.birthday)
      ) {
        let FD = new FormData()
        for (let name in state) {
          FD.append(name, state[name])
        }
        const xhr = new XMLHttpRequest("http://localhost:10080")
        console.log(xhr)
        xhr.onload = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.response)
            const json = JSON.parse(xhr.response)
            if (json.type === 'render') {
              this.findApplicant()
            }
          } else if (xhr.readyState === 4 && xhr.status === 404) {
            const json = JSON.parse(xhr.response)
            if (json.type === 'error') {
              if (typeof json.msg.code !== 'undefined') {
                alert('Error! Please check your inputs. As a note, file size limit is 10MB. Please upload a smaller file.')
              } else {
                alert('Error! Please check your inputs. As a note, only the following file types are accepted: PDF, DOC, DOCX, JPEG')
              }
            }
            if (json.type === 'sql-error') {
              alert('Applicantion Error, please contact it@landfood.ubc.ca for assistance')
            }
          }
        }
        xhr.open('POST', 'api/form')
        xhr.send(FD)
      } else {
        const err = this.errorOutput(state).join(',')
        alert('There is a problem with the following: ' + err)
      }
    }
  }

  render () {
    return (
      <div className='app-container'>
        <h1 style={{ textAlign: 'center' }}> Dietetics Major Application Form 2025 </h1>
        <div style={{ textAlign: 'center' }} id='error' />
        {this.state.filledForm === true ? (
          <AppNumber applicationNumber={this.state.applicationNumber} />
        ) : (

/*
         <p>Application is now closed. </p>
           Closed for 2024 */
          <Form handleSubmit={this.handleSubmit.bind(this)} />

          )
        }
        <div className='footer'>
          <p>For assistance contact <a href='mailto:it@landfood.ubc.ca' target='_top'>it@landfood.ubc.ca</a></p>
          <a href='https://dietpin.landfood.ubc.ca/Shibboleth.sso/Logout?return=https://dietetics.landfood.ubc.ca' >CWL LOGOUT</a>
        </div>
      </div>
    )
  }
}
