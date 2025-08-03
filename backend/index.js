const express = require('express')
const cors = require('cors');
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()
app.use(cors())
app.use(express.json())

const dbpath = path.join(__dirname, 'doctorsInfo.db')

let db

const initializeDbAndServer = async () =>{
    try {
        db = await open({
            filename: dbpath,
            driver: sqlite3.Database
        })
        app.listen(3000, ()=> {
            console.log('Server Running at http://localhost:3000/')
        })
    } catch (e) {
        console.log(`DB Error: ${e.message}`)
        process.exit(1)
    }
}

initializeDbAndServer()


//API 1:

app.get('/doctors-list', async (request,response) =>{
    const getListOfDoctors = `
    SELECT id, name, specialization, specialization_id, profile_img, location
    FROM doctors
    `;
    const doctorsListResponse = await db.all(getListOfDoctors)
    response.send(doctorsListResponse)
   
})

//API 2:
app.get('/doctor-profile/:id', async (request,response) =>{
    const {id} = request.params
    const getPorfileData = `
    SELECT *
    FROM doctors
    WHERE id=${id} 
    `;
    const profileDataResponse = await db.get(getPorfileData)    
    response.send(profileDataResponse)
})

//API 3:
app.get('/book-appointment', async (request,response)=>{
    const getappointmentDetails=`
    SELECT DISTINCT id, name, specialization_id AS specializationId, specialization, location
    FROM doctors
    `;
    const appointmentDetailsResponse = await db.all(getappointmentDetails)  
    response.send(appointmentDetailsResponse)
})

module.exports = app