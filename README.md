# DB Data Bank CRM

A complete Customer Relationship Management (CRM) application built with Node.js, Express, SQLite, and React.

## Features

- **User Authentication**: Login and registration with JWT tokens
- **Contact Management**: Add, view, and manage customer contacts
- **Deal Management**: Track sales deals and opportunities
- **Dashboard**: Beautiful and intuitive user interface
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
db-data-bank/
├── backend/
│   ├── routes/
│   │   ├── auth.js          # Authentication endpoints
│   │   └── crm.js           # CRM endpoints
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── models/
│   │   └── database.js      # Database connection and helpers
│   ├── scripts/
│   │   └── initDB.js        # Database initialization
│   ├── data/                # SQLite database storage
│   ├── server.js            # Main server file
│   ├── package.json         # Backend dependencies
│   └── .env                 # Environment variables
├── frontend/
│   ├── public/
│   │   └── index.html       # HTML entry point
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js     # Login page
│   │   │   └── Dashboard.js # Dashboard page
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── App.css
│   │   │   ├── Login.css
│   │   │   └── Dashboard.css
│   │   ├── App.js           # Main app component
│   │   └── index.js         # React entry point
│   ├── package.json         # Frontend dependencies
│   └── .gitignore
└── README.md                # This file

```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/db-data-bank.git
   cd db-data-bank
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Initialize Database**
   ```bash
   node scripts/initDB.js
   ```

4. **Start Backend Server**
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000`

5. **Install Frontend Dependencies (in a new terminal)**
   ```bash
   cd frontend
   npm install
   ```

6. **Start Frontend Development Server**
   ```bash
   npm start
   ```
   The frontend will automatically open at `http://localhost:3000`

## Default Login Credentials

- **Email**: admin@crm.com
- **Password**: admin123

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user

### CRM
- `GET /api/crm/contacts` - Get all contacts
- `POST /api/crm/contacts` - Create new contact
- `GET /api/crm/deals` - Get all deals
- `POST /api/crm/deals` - Create new deal

## Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **SQLite3** - Database
- **JWT (json-web-token)** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
NODE_ENV=development
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Contacts Table
```sql
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  status TEXT DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
)
```

### Deals Table
```sql
CREATE TABLE deals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  contact_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  value REAL,
  status TEXT DEFAULT 'open',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (contact_id) REFERENCES contacts(id)
)
```

## Future Enhancements

- [ ] Add update and delete functionality
- [ ] Implement user profiles
- [ ] Add email notifications
- [ ] Create advanced reporting
- [ ] Add file upload support
- [ ] Implement real-time updates with WebSockets

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the ISC License.

## Contact

For support or inquiries, please open an issue in the repository.

---

**Happy coding! 🚀**
