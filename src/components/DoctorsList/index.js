import {Component} from 'react';

import Loader from 'react-loader-spinner'

import SearchBanner from '../SearchBanner';
import DoctorCard from '../DoctorCard'
import './index.css';

const apiStatusConstants = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE'
}


class DoctorsList extends Component{
    state = {docList:'',originalList:'', apiStatus: apiStatusConstants.initial}

    componentDidMount(){
        this.getDoctorsList()
    }

    getDoctorsList = async () =>{
        this.setState({apiStatus: apiStatusConstants.inProgress})
          
        const response = await fetch("http://localhost:3000/doctors-list")
        const data = await response.json()

        if(response.ok===true){
            const updatedData = data.map(eachitem=>({
                id: eachitem.id,
                name: eachitem.name,
                profileImg:eachitem.profile_img,
                specialization: eachitem.specialization,
                specializationId: eachitem.specialization_id,
                location: eachitem.location
            }))
            this.setState({docList: updatedData,originalList:updatedData, apiStatus: apiStatusConstants.success})
        } else {
            this.setState({apiStatus:apiStatusConstants.failure})
        }

    }

    filteredDocList = (location,specialityId)=>{
        const {originalList}=this.state
        const filteredList = originalList.filter( eachDoc => eachDoc.location===location && eachDoc.specializationId===parseInt(specialityId))
        this.setState({docList:filteredList})
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
            <button className='try-again-button' type="button" onClick={() => this.getDoctorsList()}>Try Again</button>
        </div>
    )
    

    renderSuccessView = ()=>{
        const {docList} = this.state
        return(
           <div className= "doctors-list-container">
            <p className="doctors-list-para">Our team of</p>
            <h1 className="doctors-list-heading">Expert Doctors</h1>
            <ul className='unordered-doctors-list'>
                {docList.length!==0? (docList.map(eachDoc => (
                    <DoctorCard card={eachDoc}  key={eachDoc.id}/>    
                ))) : (<h1>Oops! Couldn't find what your are looking for...</h1>)}
            </ul>
           </div>
        )
    }

    render(){
        const {apiStatus} = this.state
        let content
        
        switch (apiStatus) {
            case apiStatusConstants.inProgress:
                content = this.renderLoadingView()
                break
            case apiStatusConstants.failure:
                content = this.renderFailureView()
                break
            case apiStatusConstants.success:
                content = this.renderSuccessView()
                break
            default:
                content = null
                break
        }

        return(
            <div className="home-page-container">
                <SearchBanner onSearch={this.filteredDocList}/>
                {content}
            </div>
        )
    }
}

export default DoctorsList