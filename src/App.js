import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'

import DoctorsList from './components/DoctorsList'
import BookAppointment from './components/BookAppointment'
import DoctorProfile from './components/DoctorProfile'
import NotFound from './components/NotFound'

const App = () =>(
  <Switch>
    <Route exact path="/" component={DoctorsList} />
    <Route exact path="/book-appointment" component={BookAppointment} />
    <Route path="/doctor-profile/:id" component={DoctorProfile} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App;
