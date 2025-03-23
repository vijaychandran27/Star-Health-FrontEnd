# React + Vite

Frontend - Dynamic Form Application
This is the frontend for the Dynamic Form Application. It is built with React and handles user interactions, form submissions, and data validations. Users can fill out personal details, upload a salary slip (for incomes above 50,000), and submit the data to the backend.

Features
Dynamic Form: Form fields dynamically adapt based on the user’s input.

Salary Slip Upload: Upload functionality for salary slip when annual income exceeds 50,000.

Form Validation: Required fields and percentage validation for members.

Responsive UI: Built with Ant Design components for a smooth user experience.

Prerequisites
Before running the frontend application, ensure that you have the following installed on your system:

Node.js (v14.x or higher)

npm (Node Package Manager)

Installation & Setup
Clone the repository:

git clone https://github.com/your-username/repository-name.git
cd repository-name/frontend

Install dependencies:

Install the required dependencies using npm:

npm install

Environment Variables:

Create a .env file in the root of the frontend directory and add the following environment variable:

VITE_API_URL=http://localhost:5000/api

Replace the VITE_API_URL with your backend API URL.

Run the development server:

Start the development server with:

npm run dev
The app will be available at http://localhost:5173.

Project Structure
src/components: Contains reusable components like SelectField, RadioGroup, SalarySlipUpload, etc.

src/App.jsx: Main application file where form logic and state management reside.

src/utils: Utility functions (e.g., API call handling).

Additional Information
Form Data Submission: On form submission, the frontend validates the form and sends data to the backend via the axios POST request.

Salary Slip Upload: The salary slip is uploaded only if the user's annual income exceeds 50,000. If uploaded, the backend stores the file.


