import {Component} from 'react'
import {BsSearch, BsFillBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Header from '../Header'
import ProfileSection from '../ProfileSection'
import FilterGroup from '../FilterGroup'

import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    salaryRange: '',
    employmentType: [],
    jobsApiStatus: apiStatusList.initial,
  }

  componentDidMount() {
    this.getAllJobs()
  }

  onClickingRetry = () => {
    this.getAllJobs()
  }

  getAllJobs = async () => {
    const {searchInput, salaryRange, employmentType} = this.state
    const employmentString = employmentType.join(',')

    this.setState({jobsApiStatus: apiStatusList.loading})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentString}&minimum_package=${salaryRange}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const formattedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      return this.setState({
        jobsList: formattedData,
        jobsApiStatus: apiStatusList.success,
      })
    }
    return this.setState({jobsApiStatus: apiStatusList.failure})
  }

  onChangingSearchValue = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickingSearchIcon = () => {
    this.getAllJobs()
  }

  updateSalaryRange = salaryRange => {
    this.setState({salaryRange}, this.getAllJobs)
  }

  updateEmploymentType = employmentType => {
    this.setState({employmentType}, this.getAllJobs)
  }

  getSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length > 0) {
      return (
        <ul className="jobs-list-container">
          {jobsList.map(job => {
            const {
              companyLogoUrl,
              id,
              title,
              jobDescription,
              rating,
              location,
              employmentType,
              packagePerAnnum,
            } = job
            return (
              <li key={id} className="job-list-item">
                <Link to={`/jobs/${id}`} className="job-link-item">
                  <div className="item-logo-name-container">
                    <img
                      src={companyLogoUrl}
                      alt="company logo"
                      className="company-logo"
                    />
                    <div>
                      <h1 className="job-list-item-title">{title}</h1>
                      <div className="item-star-rating-container">
                        <AiFillStar className="job-list-item-star" />
                        <p className="job-list-item-rating">{rating}</p>
                      </div>
                    </div>
                  </div>
                  <div className="item-package-container">
                    <div className="item-location-employment-container">
                      <div className="item-location-container">
                        <MdLocationOn className="job-list-item-location-icon" />
                        <p className="job-list-item-location">{location}</p>
                      </div>
                      <div className="item-employment-container">
                        <BsFillBriefcaseFill className="job-list-item-briefcase-icon" />
                        <p className="job-list-item-employment-type">
                          {employmentType}
                        </p>
                      </div>
                    </div>
                    <p className="job-list-item-package">{packagePerAnnum}</p>
                  </div>
                  <hr className="horizontal-line" />
                  <h1 className="job-list-item-description-title">
                    Description
                  </h1>
                  <p className="job-list-item-description">{jobDescription}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      )
    }

    return (
      <div className="jobs-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="jobs-failure-image"
        />
        <h1 className="jobs-failure-heading">No Jobs Found</h1>
        <p className="jobs-failure-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  getLoadingView = () => (
    <div className="profile-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="jobs-failure-retry-button"
        onClick={this.onClickingRetry}
      >
        Retry
      </button>
    </div>
  )

  getJobsView = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
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
    const {searchInput, salaryType, employmentType} = this.state
    return (
      <>
        <Header />
        <div className="jobs-main-container">
          <div className="jobs-container">
            <div className="search-sm-container">
              <input
                type="search"
                value={searchInput}
                placeholder="Search"
                className="search-input"
                onChange={this.onChangingSearchValue}
              />
              <button
                type="button"
                className="search-button"
                onClick={this.onClickingSearchIcon}
                testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="profile-filter-container">
              <ProfileSection />
              <FilterGroup
                salaryType={salaryType}
                employmentType={employmentType}
                updateSalaryRange={this.updateSalaryRange}
                updateEmploymentType={this.updateEmploymentType}
              />
            </div>
            <div className="search-jobs-list-container">
              <div className="search-lg-container">
                <input
                  type="search"
                  value={searchInput}
                  placeholder="Search"
                  className="search-input"
                  onChange={this.onChangingSearchValue}
                />
                <button
                  type="button"
                  className="search-button"
                  onClick={this.onClickingSearchIcon}
                  testid="searchButton"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.getJobsView()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default AllJobsSection
