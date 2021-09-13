import React, { Component } from 'react'

export default class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      currentInstitution: '',
      id: '',
      email: '',
      verifyEmail: '',
      UBCEmail: '',
      verifyUBCEmail: '',
      phone: '',
      birthday: '',
      numOfApp: '',
      aboriginal: '',
      aborId: '',
      date: '',
      files: null
    }
    this.setFirstName = this.setFirstName.bind(this)
    this.setLastName = this.setLastName.bind(this)
    this.setCurrentInstitution = this.setCurrentInstitution.bind(this)
    this.setid = this.setid.bind(this)
    this.setUBCEmail = this.setUBCEmail.bind(this)
    this.setVerifyUBCEmail = this.setVerifyUBCEmail.bind(this)
    this.setEmail = this.setEmail.bind(this)
    this.setVerifyEmail = this.setVerifyEmail.bind(this)
    this.setPhone = this.setPhone.bind(this)
    this.setBirthday = this.setBirthday.bind(this)
    this.setNumOfApp = this.setNumOfApp.bind(this)
    this.setAboriginal = this.setAboriginal.bind(this)
    this.setAborId = this.setAborId.bind(this)
    this.handleFileSelect = this.handleFileSelect.bind(this)
    this.canBeAboriginal = this.canBeAboriginal.bind(this)
  }

  componentWillMount () {
    this.setState({ date: new Date().toJSON().slice(0, 10).toString() })
  }

  setFirstName (event) {
    this.setState({ firstName: event.target.value })
  }

  setLastName (event) {
    this.setState({ lastName: event.target.value })
  }

  setCurrentInstitution (event) {
    this.setState({ currentInstitution: event.target.value })
  }

  setid (event) {
    this.setState({ id: event.target.value })
  }

  setUBCEmail (event) {
    this.setState({ UBCEmail: event.target.value })
  }

  setVerifyUBCEmail (event) {
    this.setState({ verifyUBCEmail: event.target.value })
  }
  setEmail (event) {
    this.setState({ email: event.target.value })
  }

  setVerifyEmail (event) {
    this.setState({ verifyEmail: event.target.value })
  }

  setPhone (event) {
    this.setState({ phone: event.target.value })
  }

  setBirthday (event) {
    this.setState({ birthday: event.target.value })
  }

  setNumOfApp (event) {
    this.setState({ numOfApp: event.target.value })
  }

  setAboriginal (event) {
    this.setState({ aboriginal: event.target.value })
  }

  setAborId (event) {
    this.setState({ aborId: event.target.value })
  }

  handleFileSelect (event) {
    this.setState({ files: event.target.files[0] })
  }

  canBeAboriginal () {
    return this.state.aboriginal.toUpperCase() === 'YES'
  }

  render () {
    const isAboriginal = this.canBeAboriginal()
    return (
      <div>
        <div className='form'>
          <form onSubmit={this.props.handleSubmit(this.state)}>
            <div>
              <label>Last Name:&nbsp;</label>
              <input type='text' id='lastName' value={this.state.lastName} onChange={this.setLastName} required />
            </div>
            <div>
              <label>First Name:&nbsp;</label>
              <input type='text' id='firstName' value={this.state.firstName} onChange={this.setFirstName} required />
            </div>
            <div>
              <label>Current Educational Institution:&nbsp;</label>
              <input type='text' id='currentInstitution' value={this.state.currentInstitution} onChange={this.setCurrentInstitution} required />
            </div>
            <div>
              <label>UBC Student Number:&nbsp;</label>
              <input type='number' id='id' value={this.state.id} onChange={this.setid} required />
            </div>
            <div>
              <label>UBC Student Email Address (sign up <a href='https://myaccount.ubc.ca/' target='_blank' rel='noopener noreferrer' >here</a>): &nbsp;</label>
              <input type='email' id='ubcemail' value={this.state.UBCEmail} onChange={this.setUBCEmail} required />
            </div>
            <div>
              <label>Verify UBC Student Email Address:&nbsp;</label>
              <input type='email' id='verifyUBCEmail' value={this.state.verifyUBCEmail} onChange={this.setVerifyUBCEmail} required />
            </div>
            <div>
              <label>Preferred Email Address:&nbsp;</label>
              <input type='email' id='email' value={this.state.email} onChange={this.setEmail} required />
            </div>
            <div>
              <label>Verify Preferred Email Address:&nbsp;</label>
              <input type='email' id='verifyEmail' value={this.state.verifyEmail} onChange={this.setVerifyEmail} required />
              <div id='verifyEmail' />
            </div>
            <div>
              <label>Phone Number:&nbsp;</label>
              <input type='number' id='phone' value={this.state.phone} onChange={this.setPhone} placeholder='' required />
            </div>
            <div>
              <label>Birthday (yyyy-mm-dd) :&nbsp;</label>
              <input type='date' id='birthday' value={this.state.birthday} onChange={this.setBirthday} required />
            </div>
            <div>
              <label>Is this your first application to the UBC Dietetics Major?:</label>
              <fieldset id='firstApp'>
                <label><input type='radio' name='firstAppNum' value='yes' checked={this.state.firstApp === 'yes'} onChange={this.setFirstApp} required /> &nbsp; Yes &nbsp;&nbsp;</label>
                <label><input type='radio' name='firstAppNum' value='no' checked={this.state.firstApp === 'no'} onChange={this.setFirstApp} /> &nbsp; No &nbsp;&nbsp;</label>
              </fieldset>
              <br />
            </div>
            <div>
              <label>If this is not your first time applying to the program, how many times have you applied in the past?&nbsp;</label>
              <select name='prevApp' onChange={this.setNumOfApp}>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5+</option>
              </select>
            </div>
            <div className='box'>
              <p><b>Aboriginal Student Self-Identification - Optional Question</b> </p>
              <p> UBC is dedicated to supporting Aboriginal student success. The university has developed a wide variety of programs
                  and student services for Aboriginal students, including academic programs, admission policies, housing and financial
                  awards. <b>Self-identification is optional</b>. If you are an Aboriginal person, we encourage you to self-identify
                  so that you may benefit from these programs and services. </p>
              <p> We use the term "Aboriginal" in the spirit of its use in section 35(2) of the Canadian Constitution, to refer inclusively to members of First Nations,
                  status and non-status, treaty and non-treaty Indians, Métis, and Inuit peoples in Canada, recognizing in doing so that many people may perfer
                  the terms that are specific and traditional to their communities. </p>
              <p><b> Aboriginal Self-Identification Questions (Optional):</b> </p>
              <div>
                <label>Do you identify yourself as an Aboriginal person of Canada?</label>
                <fieldset id='aboriginal'>
                  <label><input type='radio' name='abor' value='yes' checked={this.state.aboriginal === 'yes'} onChange={this.setAboriginal} /> &nbsp; Yes &nbsp;&nbsp;</label>
                  <label><input type='radio' name='abor' value='no' checked={this.state.aboriginal === 'no'} onChange={this.setAboriginal} /> &nbsp; No &nbsp;&nbsp;</label>
                </fieldset>
              </div>
              <div>
                <label>Do you identify with one or more of the following:</label>
                <fieldset id='aborId'>
                  <label><input type='radio' name='idAbor' value='First Nation' checked={this.state.aborId === 'First Nation'} onChange={this.setAborId} disabled={!isAboriginal} /> &nbsp; First Nations &nbsp;&nbsp;</label>
                  <label><input type='radio' name='idAbor' value='Metis' checked={this.state.aborId === 'Metis'} onChange={this.setAborId} disabled={!isAboriginal} /> &nbsp; Métis &nbsp;&nbsp;</label>
                  <label><input type='radio' name='idAbor' value='Inuit' checked={this.state.aborId === 'Inuit'} onChange={this.setAborId} disabled={!isAboriginal} /> &nbsp; Inuit &nbsp;&nbsp;</label>
                </fieldset>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <br /><br />
              <input className='btn' type='submit' value='Submit' />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
