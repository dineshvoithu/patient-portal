# Patient Document Portal

## 📌 Project Overview

This is a full-stack web application for a healthcare platform allowing patients to upload, view, download, and delete medical documents (PDFs). The application consists of a React + Tailwind CSS frontend and a Spring Boot + MySQL backend. Files are stored in the local filesystem, and metadata is stored in a MySQL database.

## 🔧 Tech Stack

- **Frontend**: React, Tailwind CSS, Axios, Vite
- **Backend**: Spring Boot, Spring Data JPA, REST APIs, Hibernate
- **Database**: MySQL
- **File Storage**: Local filesystem (`uploads/` directory)

---

## 🚀 How to Run Locally

### Prerequisites

- Node.js & npm (for frontend)
- Java 17+ and Maven (for backend)
- MySQL Server

### Backend Setup

1. Clone the repository and navigate to the backend folder:

```bash
cd backend
```

2. Configure MySQL database in `application.properties`:

```
spring.datasource.url=jdbc:mysql://localhost:3306/patient_portal
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
```

3. Run the Spring Boot application:

```bash
mvn spring-boot:run
```

This starts the backend at `http://localhost:8080`.

### Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies and run the app:

```bash
npm install
npm run dev
```

This starts the frontend at `http://localhost:5173`.

---

## 🔗 API Endpoints

### 📥 Upload a File

- **POST** `/documents/upload`
- **Body**: Multipart form-data with a `file` field (PDF only)
- **Response**: `200 OK` or error message

**curl**:

```bash
curl -F "file=@demo.pdf" http://localhost:8080/documents/upload
```

---

### 📄 List All Documents

- **GET** `/documents`
- **Response**: JSON list of document metadata

**curl**:

```bash
curl http://localhost:8080/documents
```

---

### ⬇ Download a Document

- **GET** `/documents/{id}`
- **Response**: PDF file stream

**curl**:

```bash
curl -O http://localhost:8080/documents/1
```

---

### ❌ Delete a Document

- **DELETE** `/documents/{id}`
- **Response**: `200 OK` or error

**curl**:

```bash
curl -X DELETE http://localhost:8080/documents/1
```

---

## 📁 Folder Structure

```
├── backend/
│   └── src/... (Spring Boot backend code)
├── frontend/
│   └── src/... (React frontend code)
├── README.md
├── design.md / design.pdf
```

## ✅ Notes

- Supports uploading only PDF files.
- No login/authentication implemented.
- Designed to support a single-user scenario.

---

© 2025 Patient Portal App
