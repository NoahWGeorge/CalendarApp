📅 Sport Scheduler App
Welcome to the Sport Scheduler App — a full-stack project featuring a React.js frontend and a Node.js backend.

This app allows users to:

Login securely before accessing the calendar

Select a sport and assign group members to specific days

Manage selections with Reset and Submit buttons

Enjoy a clean, responsive UI with toast notifications

Built with ❤️ using React, Node, and Express.

🚀 Features
Login Screen

Username and Password authentication

Simple credentials validation (Username: admin, Password: password)

Toast notifications for invalid login attempts

Calendar Dashboard

Interactive monthly calendar (powered by react-calendar)

Click a date to open a sidebar popup

Choose a sport from a dropdown

Select multiple group members to associate with the date

Submit or Reset your selections with easy-to-use buttons

Clean and responsive design

Notifications

Success and error toasts powered by react-toastify

Instant feedback on actions like submitting or resetting

Modular Structure

/client - React frontend

/server - Node + Express backend (future ready for API integration)

🛠 Tech Stack
Frontend: React.js, React Calendar, React Toastify

Backend: Node.js, Express.js (basic setup)

Styling: CSS Flexbox, Custom Components

Deployment Ready: Fully GitHub-compatible project structure

📸 Screenshots

Login Page	Calendar App
(Replace placeholder URLs with real screenshots later if you want!)

🧪 How to Run Locally
Clone the repo

bash
Copy
Edit
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
Install frontend dependencies

bash
Copy
Edit
cd client
npm install
Install backend dependencies

bash
Copy
Edit
cd ../server
npm install
Run the app

Open two terminals:

Terminal 1 (Backend)

bash
Copy
Edit
cd server
node index.js
Terminal 2 (Frontend)

bash
Copy
Edit
cd client
npm start
Login Credentials

Username: admin

Password: password

💡 Future Enhancements
Hook frontend to real backend for saving selections

Add persistent login with JWT tokens

Allow users to create their own group members

Improve calendar with event visualization

Full responsive mobile design

📄 License
This project is open source and available under the MIT License.

👨‍💻 Author
Developed by [Your Name Here]
Feel free to connect on LinkedIn | GitHub

📬 Feedback
Got ideas? Found a bug? Feel free to open an issue or submit a pull request!
