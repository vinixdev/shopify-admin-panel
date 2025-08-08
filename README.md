# 🛍️ Shopify Clone - Admin Panel

This is the admin dashboard for the Shopify Clone project, built with React. It provides a user-friendly interface for managing products, viewing orders, and overseeing store operations.

*This admin panel communicates with our [Express.js Backend](https://github.com/vinixdev/shopify_backend).*

---

### ✨ Features

* **Interactive Dashboard**: At-a-glance view of key store metrics.
* **Product Management**: Easily add, edit, and delete products with a form-based interface.
* **Order Tracking**: View and manage incoming customer orders.

_Here is a quick look at the product management interface:_

---

### 🛠️ Tech Stack

* **Library**: React.js
* **Routing**: React Router
* **Styling**: Material-UI
* **API Communication**: Axios

---

### 🚀 Getting Started

Follow these instructions to get the admin panel running locally.

**Prerequisites**

* Node.js (v18.x or later)
* npm or yarn
* A running instance of the [backend server](https://github.com/vinixdev/shopify_backend).

**Installation & Setup**

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/vinixdev/shopify-admin-panel.git](https://github.com/vinixdev/shopify-admin-panel.git)
    cd shopify-admin-panel
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and point it to your backend API.
    ```env
    REACT_APP_API_URL=http://localhost:5000/api
    ```

4.  **Run the application:**
    ```sh
    npm start
    ```
    The admin panel will open at `http://localhost:3000`.

---

### 🔗 Related Repositories

* **Backend (Express.js)**: [github.com/vinixdev/shopify_backend](https://github.com/vinixdev/shopify_backend)
* **Frontend (Next.js)**: [github.com/vinixdev/shopify_frontend_next](https://github.com/vinixdev/shopify_frontend_next)
