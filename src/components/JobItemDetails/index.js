import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {HiOutlineExternalLink} from 'react-icons/hi'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Header from '../Header'
import './index.css'

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsObject: {},
    apiStatus: apiStatusList.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  onClickingRetry = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusList.loading})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const formattedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          title: data.job_details.title,
          lifeAtCompany: data.job_details.life_at_company.description,
          lifeAtCompanyImage: data.job_details.life_at_company.image_url,
          skills: data.job_details.skills.map(eachSkill => ({
            skillName: eachSkill.name,
            skillImageUrl: eachSkill.image_url,
          })),
        },
        similarJobs: data.similar_jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          rating: eachJob.rating,
          title: eachJob.title,
        })),
      }

      return this.setState({
        jobDetailsObject: formattedData,
        apiStatus: apiStatusList.success,
      })
    }
    return this.setState({apiStatus: apiStatusList.failure})
  }

  getSimilarJobsView = () => {
    const {jobDetailsObject} = this.state
    const {similarJobs} = jobDetailsObject

    return (
      <div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobs.map(eachJob => {
            const {
              companyLogoUrl,
              id,
              title,
              jobDescription,
              rating,
              location,
              employmentType,
            } = eachJob
            return (
              <li key={id} className="similar-jobs-item-container">
                <div className="details-logo-name-container">
                  <img
                    src={companyLogoUrl}
                    alt="similar job company logo"
                    className="details-company-logo"
                  />
                  <div>
                    <h1 className="job-list-details-title">{title}</h1>
                    <div className="details-star-rating-container">
                      <AiFillStar className="job-list-details-star" />
                      <p className="job-list-details-rating">{rating}</p>
                    </div>
                  </div>
                </div>
                <h1 className="job-list-details-description-title">
                  Description
                </h1>
                <p className="similar-jobs-description">{jobDescription}</p>
                <div className="details-location-employment-container">
                  <div className="details-location-container">
                    <MdLocationOn className="job-list-details-location-icon" />
                    <p className="job-list-details-location">{location}</p>
                  </div>
                  <div className="details-employment-container">
                    <BsFillBriefcaseFill className="job-list-details-briefcase-icon" />
                    <p className="job-list-details-employment-type">
                      {employmentType}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  getJobDetailsView = () => {
    const {jobDetailsObject} = this.state
    const {jobDetails} = jobDetailsObject
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      id,
      title,
      jobDescription,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      skills,
      lifeAtCompany,
      lifeAtCompanyImage,
    } = jobDetails

    return (
      <>
        <div key={id} className="job-item-container">
          <div className="details-logo-name-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="details-company-logo"
            />
            <div>
              <h1 className="job-list-details-title">{title}</h1>
              <div className="details-star-rating-container">
                <AiFillStar className="job-list-details-star" />
                <p className="job-list-details-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="details-package-container">
            <div className="details-location-employment-container">
              <div className="details-location-container">
                <MdLocationOn className="job-list-details-location-icon" />
                <p className="job-list-details-location">{location}</p>
              </div>
              <div className="details-employment-container">
                <BsFillBriefcaseFill className="job-list-details-briefcase-icon" />
                <p className="job-list-details-employment-type">
                  {employmentType}
                </p>
              </div>
            </div>
            <p className="job-list-details-package">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal-line" />
          <div className="details-link-container">
            <h1 className="job-list-details-description-title">Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="company-website-link"
            >
              <p className="visit-text">Visit</p>
              <HiOutlineExternalLink className="visit-icon" />
            </a>
          </div>
          <p className="job-list-details-description">{jobDescription}</p>
          <h1 className="job-list-details-description-title">Skills</h1>
          <ul className="details-skills-container">
            {skills.map(eachSkill => (
              <li key={eachSkill.skillName} className="details-skill-item">
                <img
                  src={eachSkill.skillImageUrl}
                  alt={eachSkill.skillName}
                  className="details-skill-image"
                />
                <p className="details-skill-name">{eachSkill.skillName}</p>
              </li>
            ))}
          </ul>
          <h1 className="job-list-details-description-title">
            Life at Company
          </h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">{lifeAtCompany}</p>
            <img
              src={lifeAtCompanyImage}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        {this.getSimilarJobsView()}
      </>
    )
  }

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

  getLoadingView = () => (
    <div className="profile-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getDesiredView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusList.success:
        return this.getJobDetailsView()
      case apiStatusList.failure:
        return this.getFailureView()
      case apiStatusList.loading:
        return this.getLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-main-container">
          <div className="job-details-container">{this.getDesiredView()}</div>
        </div>
      </>
    )
  }
}

export default JobItemDetails
