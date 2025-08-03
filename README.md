# 🏥 Tech Assignment - Doctor Appointment Booking App 
A full-stack web application for browsing doctors and booking appointments. Built using React for the frontend, Node.js and Express for the backend, and SQLite as the database.

## 🛠 Tools & Libraries Used

### 🖥️ Frontend
![React](https://img.shields.io/badge/Frontend-React-blue)
![CSS](https://img.shields.io/badge/Styling-CSS3-blueviolet)
- React.js (with Class Components)
- CSS (Responsive styling)
- React Router for navigation
- React Icons
- React Loader Spinner

### 🌐 Backend
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/API-Express-red)
- Node.js
- Express.js
- CORS for cross-origin requests
- sqlite3 for database access
- nodemon for server auto-reloading

### 💽 Database
![SQLite](https://img.shields.io/badge/Database-SQLite3-lightgrey)
- SQLite (with `sqlite3` and `sqlite` packages)
- Used **SQLite CLI** to create and manage tables directly and generate the `.db` file (`doctorsInfo.db`), which is accessed by the Node.js backend via the `sqlite3` and `sqlite` packages.

### 🏥 `doctors` Table

| Column            | Type    |
|-------------------|---------|
| id                | INTEGER |
| name              | TEXT    |
| profile_img       | TEXT    |
| specialization    | TEXT    |
| specialization_id | INTEGER |
| location          | TEXT    |
| bio               | TEXT    |
| qualifications    | TEXT    |
| experience        | TEXT    |
| awards            | TEXT    |

> 📌 **Note:** The profile_img column stores a Cloudinary-hosted image URL

## 🚀 Improvements With More Time

- **Responsive Design Enhancements**: Improve mobile-first UI responsiveness for smaller screens.
  
- **Real-Time Availability on Profile Page**: Instead of showing a fixed schedule for all doctors, integrate live availability data in each doctor's profile. This would give users real-time insight into free slots before booking.

- **Popup-Based Booking Form**: Use the [`reactjs-popup`](https://www.npmjs.com/package/reactjs-popup) package to show a booking form as a popup when users click “Book Appointment” on a doctor’s profile. Pre-fill the form with the selected doctor’s data for better UX, instead of redirecting to a separate page.

- **Doctor Availability Management**: Create a dedicated `availability` table in the SQLite database to track:
  - Days of availability (e.g., Monday–Saturday)
  - Working hours (e.g., 10 AM – 4 PM)
  - Booked slots (to prevent overlaps)

- **Dynamic Appointment Calendar**:
  - The current implementation uses a static `<input type="date" />`, which doesn’t allow dynamic control over unavailable dates.
  - With more time, integrate a third-party calendar UI like [`react-datepicker`](https://reactdatepicker.com/), which would enable:
    - ⛔ Disabling weekends or public holidays
    - ✅ Highlighting available days
    - 🔒 Blocking dates with full appointments
    - 🕐 Choosing time slots within working hours directly from the calendar

- **Implement `POST /appointments` endpoint**: Handle user form submissions by inserting data into a bookings table and updating the availability table to block the selected time slot, preventing double bookings.


> These enhancements would improve usability, prevent overbooking, and streamline the booking process for users.

## ⚠️ Challenges Faced & Solutions

- **Port Conflict:**  
    Both frontend and backend initially tried to run on the same port (3000), which caused startup issues.  
    **Solution:** Changed React app to run on port `3001` while backend stayed on `3000`.

- **CORS Errors:**  
    Faced issues when React frontend (localhost:3001) tried to fetch data from Node backend (localhost:3000).  
    **Solution:** Added CORS middleware in Express using `cors` package.

- **SQLite Setup Confusion:**  
    Initially tried to create the `.db` file using scripts, but the process felt complex and error-prone.  
    **Solution:** Switched to using the SQLite CLI to manually define tables and insert sample data.

- **Dynamic Filtering Issues:**  
    Filtering doctors by location and specialization didn’t work as expected due to data type mismatches.  
    **Solution:** Ensured correct type conversion and used `parseInt()` for consistent comparison.

- **Form Validation:**  
    Basic `<select>` elements lacked required validation.  
    **Solution:** Added `required` attribute and default hidden options to enforce input.

- **Real-Time Availability Logic:**  
    Needed a way to reflect available slots per doctor.  
    **Solution:** Due to limited time, implemented a static table showing default OP timings (10:00am–04:00pm, Mon–Sat) in doctors profile page.


## Screenshots

### Landing Page
![Landing Page](./screenshots/landing_page.png)

### On Search Returning Empty Array
![Search Page](./screenshots/search_empty.png)

### Failed To Fetch Data
![Failure View](./screenshots/failure_view.png)

### Doctor Profile Page
![Profile Page](./screenshots/doctor_profile_page.png)

### Book Appointment Page
![Appointment Page](./screenshots/book_appointment_page.png)

### On Booking Success
![Success Message](./screenshots/success_message.png)

### Not Found Page
![Not Found Page](./screenshots/not_found_page.png)

## 📌 Features

- View list of doctors with their specialization & profile image
- Filter by location & specialization
- Book appointment with form validations
- Displays success message after booking
- Backend APIs for doctor list

## 🧪 API Endpoints

- ### `GET /doctors-list`
    Returns the list of all doctors with their profile image, name, specialization, and location.

- ### `GET /doctor-profile/:id`
    Returns detailed profile of the selected doctor.

- ### `GET /book-appointment`
    Returns options to populate distinct location, specialization, and doctor dropdowns.

## ⚙️ Setup Instructions

1. ### Clone the Repository

    ```
    git clone https://github.com/Vinay-Sathupati/doctor-appointment.git
    ```

2. ### Install Dependencies

    
    **Backend**
    ```
    cd backend
    npm install
    ```

    **Frontend**
    ```
    cd ../frontend
    npm install
    ```

3. ### Start the Servers

    **Start backend**
    ```
    cd backend
    nodemon index.js
    ```

    **Start frontend**
    ```
    cd ../frontend
    npm start
    ```


## 🎁 Contribution
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.