import {Link} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const {history} = props

  const onClickGoHome = () => {
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">Lost Your Way ?</h1>
      <p className="not-found-text">
        we are sorry, the page you requested could not be found <br /> Please go
        back to the homepage.
      </p>
      <Link to="/" className="link-item">
        <button
          type="button"
          className="go-home-button"
          onClick={onClickGoHome}
        >
          Go to Home
        </button>
      </Link>
    </div>
  )
}

export default NotFound