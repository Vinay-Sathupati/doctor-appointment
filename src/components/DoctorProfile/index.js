import { Component } from "react"

import Loader from 'react-loader-spinner'
import { AiFillHome } from "react-icons/ai";
import './index.css'
import { Link } from "react-router-dom"

const apiStatusConstants = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE'
}

class DoctorProfile extends Component{
    state = { profileData:{}, apiStatus:apiStatusConstants.initial}

    componentDidMount() {
        this.getProfileData()
    }

    getProfileData = async () =>{
        this.setState({apiStatus: apiStatusConstants.inProgress})
        const {match} = this.props
        const {params} = match
        const {id} = params
        const response = await fetch(`http://localhost:3000/doctor-profile/${id}`)
        const data = await response.json()

        if(response.ok===true){
            const updatedData = {
                id:data.id,
                name: data.name,
                location:data.location,
                profileImg:data.profile_img,
                specialization: data.specialization,
                specializationId: data.specialization_id,
                qualifications: data.qualifications,
                bio: data.bio,
                experience:data.experience,
                awards: data.awards
            }
            this.setState({profileData:updatedData, apiStatus:apiStatusConstants.success})
        } else {
            this.setState({apiStatus:apiStatusConstants.failure})
        }
    }

    renderLoadingView = () =>(
        <div className="loader-container">
            <Loader type="TailSpin" color="#1e74ad" height={50} width={50} />
        </div>
    )

    renderFailureView = () =>(
        <div className="profile-fetch-failure-container">
            <h1 className='profile-fetch-failure-heading'>Oops! Something went wrong</h1>
            <p className='profile-fetch-failure-para'>Please Try Again</p>
            <button className='try-again-button' type="button" onClick={() => this.getProfileData()}>Try Again</button>
        </div>
    )

    renderSuccessView = () =>{
        const {profileData} = this.state
        return (
            <>
                <div className='doctor-profile-banner'>
                    <div className='home-icon-container'>
                        <Link to="/">
                            <AiFillHome className='home-icon'/>
                        </Link>
                    </div>
                     <div className='doctor-profile-heading-container'>
                        <h1 className='doctor-profile-heading'>Doctor Profile</h1>
                     </div>
                    
                </div>
                <div className="profile-fetch-success-main-container">
                    <div className="profile-fetch-success-img-container">
                        <img src={profileData.profileImg} alt="profile-img" className="profile-fetch-success-profile-img"/>
                        <Link to="/book-appointment">
                            <button className="profile-fetch-success-book-button" type="button">Book Appointment</button>
                        </Link>
                    </div>
                    <div className="profile-fetch-success-profile-container">
                        <div>
                            <h1 className="profile-fetch-success-name">{profileData.name}</h1>
                            <p className="profile-fetch-success-specialization">{profileData.specialization}</p>
                        </div>
                        <hr className="horizontal-line"/>
                        <div className="op-table-container">
                            <p>OP Timings:</p>
                            <table className="profile-op-timing-table" cellSpacing="0" cellPadding="8">
                                <thead>
                                    <tr>
                                    <th>Monday</th>
                                    <th>Tuesday</th>
                                    <th>Wednesday</th>
                                    <th>Thursday</th>
                                    <th>Friday</th>
                                    <th>Saturday</th>
                                    <th>Sunday</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>10:00am - 04:00pm</td>
                                    <td>10:00am - 04:00pm</td>
                                    <td>10:00am - 04:00pm</td>
                                    <td>10:00am - 04:00pm</td>
                                    <td>10:00am - 04:00pm</td>
                                    <td>10:00am - 04:00pm</td>
                                    <td>Not Available</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h1 className="profile-fetch-success-headings">Brief profile</h1>
                            <p className="profile-fetch-success-paras">{profileData.bio}</p>
                            <h1 className="profile-fetch-success-headings">Qualifications</h1>
                            <p className="profile-fetch-success-paras">{profileData.qualifications}</p>
                            <h1 className="profile-fetch-success-headings">Experience</h1>
                            <p className="profile-fetch-success-paras">{profileData.experience}</p>
                            <h1 className="profile-fetch-success-headings">Awards</h1>
                            <p className="profile-fetch-success-paras">{profileData.awards}</p>
                        </div>
                    </div>  
                </div>
            </>
        )
    }

    render() {
        const {apiStatus}=this.state

        switch (apiStatus) {
            case apiStatusConstants.inProgress:
                return this.renderLoadingView()
            case apiStatusConstants.failure:
                return this.renderFailureView()
            case apiStatusConstants.success:
                return this.renderSuccessView()
            default:
                return null
        }
    }
}

export default DoctorProfile