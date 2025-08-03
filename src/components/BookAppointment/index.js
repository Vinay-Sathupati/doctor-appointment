import { Component } from 'react'

import './index.css'

import Loader from 'react-loader-spinner'

import { SiTicktick } from "react-icons/si";
import { AiFillHome } from "react-icons/ai";
import {Link} from 'react-router-dom'

const apiStatusConstants = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE'
}


class BookAppointment extends Component{
    state={apiStatus: apiStatusConstants.initial, location:'', speciality:'',name:'', submitted: false, appointmentOptions: []}

    componentDidMount() {
        this.getAppointmentOptions()
    }

    getAppointmentOptions = async () => {
        this.setState({ apiStatus: apiStatusConstants.inProgress })

        const response = await fetch("http://localhost:3000/book-appointment")
        const data = await response.json()

        if (response.ok) {
            this.setState({
            appointmentOptions: data,
            apiStatus: apiStatusConstants.success
            })
        } else {
            this.setState({ apiStatus: apiStatusConstants.failure })
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
            <button className='try-again-button' type="button" onClick={() => this.getAppointmentOptions()}>Try Again</button>
        </div>
    )

     onEnterLocation = event=>{
        this.setState({location: event.target.value})
    }

    onEnterSpeciality = event =>{
        this.setState({speciality: event.target.value})
    }

    onEnterDocName = event => {
        this.setState({ name: event.target.value })
    }

    onSubmitForm = event =>{
        event.preventDefault()
        this.setState({submitted:true})
    }


    renderFormView = () => {
        const {location, speciality,name, appointmentOptions} = this.state

        return (
            <div className='book-appointment-page-main-container'>
                <div className='book-appointment-banner'>
                    <div className='home-icon-container'>
                        <Link to="/">
                            <AiFillHome className='home-icon'/>
                        </Link>
                    </div>
                    <div className='book-appointment-heading-container'>
                        <h1 className='book-appointment-heading'>Book An Appointment</h1>
                    </div>
                </div>
                <form className='booking-form-main-container' onSubmit={this.onSubmitForm}>
                    <div className='booking-form'>
                        <div className='form-fill-container'>
                            <select required className="patient-selection-details" id="location" value={location} onChange={this.onEnterLocation}>
                                <option disabled hidden value="">Location</option>
                                {[...new Set(appointmentOptions.map(item => item.location))].map(locationOption => (
                                    <option key={locationOption} value={locationOption}>{locationOption}</option>
                                ))}
                            </select>
                            <select required className="patient-selection-details" id="speciality" value={speciality} onChange={this.onEnterSpeciality}>
                                <option disabled hidden value="">Select a Speciality</option>
                                {[...new Map(appointmentOptions.map(item => [item.specializationId, item.specialization])).entries()].map(([id, name]) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </select>
                            <select required className="patient-selection-details" id="name" value={name} onChange={this.onEnterDocName}>
                                <option disabled hidden value="">Select Doctor</option>
                                {appointmentOptions.filter(item => item.location === location && item.specializationId === parseInt(speciality)).map(doctor => (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.name}
                                    </option>
                                ))}
                            </select>
                            <input required type="date" min={new Date().toISOString().split("T")[0]} className='patient-selection-details'/>
                        </div>
                        <div className='form-fill-container'>
                            <input required type="text" placeholder='Name' className='patient-selection-details'/>
                            <input required type='tel' placeholder='Mobile Number' className='patient-selection-details'/>
                            <input required type='email' placeholder='Email ID' className='patient-selection-details'/>
                        </div>
                    </div>
                    <div  className='form-fill-container'> 
                        <textarea required placeholder='Write Reasons' className='patient-text-area-details'></textarea>
                        <div className='submit-button-container'>
                            <button className='form-book-button' type='submit'>Book</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    renderSubmittedView = () => (
        <div className='book-appointment-page-main-container'>
            <div className='book-appointment-banner'>
                    <div className='home-icon-container'>
                        <Link to="/">
                            <AiFillHome className='home-icon'/>
                        </Link>
                    </div>
                    <div className='book-appointment-heading-container'>
                        <h1 className='book-appointment-heading'>Book An Appointment</h1>
                    </div>
                </div>
            <div className='booking-submit-main-container'>
                <SiTicktick className='success-tick-icon' />
                <h1 className='booking-success-heading'>Success</h1>
                <p className='booking-success-para'>Our executive will reach out to you shortly</p>
                <Link to="/">
                    <button type="button" className='booking-success-ok-button'>OK</button> 
                </Link>
            </div>
        </div>
    )

    renderSuccessView = ()=>{
        const {submitted}=this.state
        
        return submitted? this.renderSubmittedView() :  this.renderFormView()
        
    }

    render(){
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


export default BookAppointment