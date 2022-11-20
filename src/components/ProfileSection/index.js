import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class AllJobsSection extends Component {
  state = {
    profileDetails: {},
    profileApiStatus: apiStatusList.initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  onClickingRetry = () => {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({profileApiStatus: apiStatusList.loading})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const profileDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      return this.setState({
        profileDetails,
        profileApiStatus: apiStatusList.success,
      })
    }
    return this.setState({profileApiStatus: apiStatusList.failure})
  }

  getSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="person-name">{name}</h1>
        <p className="person-bio">{shortBio}</p>
      </div>
    )
  }

  getLoadingView = () => (
    <div className="profile-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getFailureView = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        className="profile-retry-button"
        onClick={this.onClickingRetry}
      >
        Retry
      </button>
    </div>
  )

  getProfileView = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusList.success:
        return this.getSuccessView()
      case apiStatusList.loading:
        return this.getLoadingView()
      case apiStatusList.failure:
        return this.getFailureView()
      default:
        return null
    }
  }

  render() {
    return this.getProfileView()
  }
}

export default AllJobsSection
