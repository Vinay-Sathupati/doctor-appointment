import { Component } from "react";

import {Link} from 'react-router-dom'

import './index.css'

class SearchBanner extends Component{
    state = {location:'', speciality:''}

    onEnterLocation = event=>{
        this.setState({location: event.target.value})
    }

    onEnterSpeciality = event =>{
        this.setState({speciality: event.target.value})
    }

    searchDoctor = ()=>{
        const {location,speciality}=this.state
        const {onSearch} = this.props
        if (!location || !speciality) {
            alert("Please select both location and speciality")
            return
        }
        onSearch(location, speciality)
    }

    render(){
        const {location, speciality}=this.state
        return(
            <nav className="nav-container">
                <h1 className="nav-heading">Find a Doctor</h1>
                <div className="search-container">
                    <select className="location" id="location" value={location} onChange={this.onEnterLocation}>
                        <option disabled hidden value="">Location</option>
                        <option value="secunderabad">Secunderabad</option>
                        <option value="vizag">Vizag</option>
                        <option value="guntur">Guntur</option>
                    </select>
                    <select className="speciality" id="speciality" value={speciality} onChange={this.onEnterSpeciality}>
                        <option disabled hidden value="">Select a Speciality</option>
                        <option value="4">General Physician</option>
                        <option value="1">Cardiologist</option>
                        <option value="3">ENT Specialist</option>
                        <option value="2">Dentist</option>
                    </select>
                    <button type="button" className="search-button" onClick={this.searchDoctor}>Search</button>
                    <Link to="/book-appointment">
                        <button type="button" className="search-bar-book-appiontment-button">Book An Appointment</button>
                    </Link>
                </div>
            </nav>
        )
    }
}

export default SearchBanner