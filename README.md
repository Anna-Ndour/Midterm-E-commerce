# Full-Stack E-Commerce Application

An e-commerce platform built with REST API, persistent database storage, and a dual-role user system (Admin vs. Client).

## Features

### For Clients
- **Product Discovery**: Browse a dynamic list of products with real-time search and filtering by category.
- **Persistent Cart**: Add and remove items from a shopping cart that stays updated via the database.
- **User Accounts**: Secure Sign-up and Login system to manage personal sessions.

### For Admins (Creators)
- **Inventory Management**: Exclusive access to the "Admin Panel" to add new products.
- **Role-Based Access**: Specialized UI that hides management tools from regular customers.
- **Protected Routes**: Backend verification to ensure only authorized users can modify the database.

## Tech Stack

- **Frontend**: React.js, React Router (for navigation).
- **Backend**: Node.js, Express.js (REST API).
- **Database**: SQLite (local file-based storage).
- **ORM**: Sequelize (Object-Relational Mapping).
- **Styling**: Modern CSS-in-JS and Responsive Design.

## Installation & Setup

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   # In the root or server folder
   npm install
