import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', showSubmitError: false}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      return this.onSubmitSuccess(data.jwt_token)
    }
    return this.onSubmitFailure(data.error_msg)
  }

  onChangingUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangingPasswordInput = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, showSubmitError} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <label htmlFor="username" className="input-label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder="Username"
              className="input-value"
              onChange={this.onChangingUsernameInput}
            />
            <label htmlFor="password" className="input-label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              className="input-value"
              onChange={this.onChangingPasswordInput}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-text">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
