
### FutureFortune: Retirement Advisor App

---

### Description
FutureFortune is a comprehensive solution designed to provide users with insights into their retirement planning. It combines a Flask backend with a React Native frontend to deliver a seamless experience. The app calculates the years to retirement, expected life expectancy based on age and gender, and offers personalized asset allocation advice.

---

### Key Features
- **Years to Retirement Calculation**: Based on user's current age.
- **Life Expectancy Retrieval**: Gender-specific life expectancy estimation.
- **Asset Allocation Guidance**: Tailored asset allocation suggestions according to the years left to retirement.

---

### Installation & Setup

#### Backend Setup (Flask API)
1. Ensure Python 3.x is installed.
2. Install Flask and required libraries: `pip install Flask flask-cors pandas`.
3. Run `app.py` to start the Flask server.

#### Frontend Setup (React Native App)
1. Ensure Node.js and React Native are installed.
2. Navigate to the app directory and install dependencies: `npm install`.
3. Run the app: `npm start`.

---

### Usage

1. **Login**: Users can log in with their username and password.
2. **Input Data**: Users enter their age and gender.
3. **Retirement Info**: The app calculates and displays years to retirement, life expectancy, and asset allocation advice.

---

### API Endpoints

- **POST `/retirement_info`**: Accepts age and gender as input and returns calculated retirement information.

---

### Technology Stack
- **Backend**: Python, Flask
- **Frontend**: React Native, JavaScript
- **Database**: Uses Excel files for data storage and retrieval

---

### Contributing
Contributions are welcome! Please read our contributing guidelines for more information.

---

### Contact
For any queries or contributions, please contact [ajseals@gmail.com](mailto:ajseals19@gmail).

---

### Acknowledgments
Special thanks to all contributors and supporters of this project.

