import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-main-container">
      <div className="not-found-container ">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="jobs-failure-image"
        />
        <h1 className="jobs-failure-heading not-found-heading">
          Page Not Found
        </h1>
        <p className="jobs-failure-description">
          we&apos;re sorry, the page you requested could not be found.
        </p>
      </div>
    </div>
  </>
)

export default NotFound
