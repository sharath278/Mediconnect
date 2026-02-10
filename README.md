# MediConnect - Healthcare Management System

A full-stack MERN application for managing medical appointments, doctors, and patients.

## Tech Stack
- **Frontend**: React.js, TailwindCSS, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)

## Prerequisities
- Node.js installed
- MongoDB Connection (Provided in config)

## How to Run

### 1. Install Dependencies
If you haven't already, install dependencies for the root, server, and client:
```bash
# Root
npm install

# Server
cd serve
npm install

# Client
cd client
npm install
```

### 2. Environment Setup
Ensure you have a `.env` file in the `server/` directory with the following (already configured):
- `MONGO_URI`: Your MongoDB connection string.
- `JWT_SECRET`: Secret key for authentication.
- `PORT`: 5000

### 3. Seed Database (Important!)
To populate the database with a default Admin, Doctor, and Patient, run the seed script from the root directory:
```bash
node server/seed.js
```
*Note: This will clear existing data and create fresh users.*

### 4. Start the Application
From the root folder (`medi_connect`), run:
```bash
npm run dev
```
This command runs both the backend (Port 5000) and frontend (Port 5173) concurrently.

### 5. Access the App
Open [http://localhost:5173](http://localhost:5173) in your browser.

## Default Credentials (Created by Seed Script)
Use these to log in and test different roles:

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@mediconnect.com` | `adminpassword` |
| **Doctor** | `doctor@mediconnect.com` | `doctorpassword` |
| **Patient** | `patient@mediconnect.com` | `patientpassword` |

## User Guide
### 1. Admin Features
- **Dashboard**: View overall statistics.
- **Manage Doctors**: Add new doctors, approve pending applications, and delete doctors.
- **View Appointments**: See all appointments across the system.

### 2. Patient Features
- **Find Doctors**: Browse doctors, view details (Hospital, Address, Fees).
- **Book Appointment**: Schedule visits and describe symptoms.
- **Symptom Checker**: Use the AI tool for preliminary analysis.
- **Dashboard**: View appointment history and status.

### 3. Doctor Features
- **Dashboard**: View upcoming appointments.
- **Manage**: Accept or reject patient requests.

## Project Structure
- `server/` - Backend API (Node.js, Express, MongoDB)
- `client/` - Frontend App (React, TailwindCSS, Vite)
- `server/seed.js` - Script to populate initial data
