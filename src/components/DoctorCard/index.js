import './index.css'

import { withRouter,Link } from 'react-router-dom' 

const DoctorCard = (props) =>{
    const {card} = props
    const {id, profileImg, name, specialization} =card

    return(
        <li className='doctor-card-each-list'>
            <img className='doctors-profile-image' src={profileImg} alt="profile-img"/>
            <div className='name-button-container'>
                <div className='doc-name-specialization'>
                    <h1 className='doc-name'>{name}</h1>
                    <p>{specialization}</p>
                </div>
                <div className='button-container'>
                    <Link to={`/doctor-profile/${id}`}>
                        <button className='view-profile-button' type="button">View Profile</button>
                    </Link>
                    <Link to="/book-appointment">
                        <button className='book-appointment-button' type='button'>Book An Appointment</button>
                    </Link>
                </div>
            </div>
        </li>
    )
}

export default withRouter(DoctorCard)