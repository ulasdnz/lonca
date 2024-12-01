
# Lonca 

## Overview

In this project, I developed an application that allows suppliers to view their monthly sales as well as their total sales by product.

1. **Monthly Sales Graph**: A graph that shows how much has been sold each month from Lonca.
2. **All-time Product Sales Table**: A table that displays the total amount of each product sold and the total money gained.

## Preview

You can check out a live demo of the application here:

[Preview Link](https://lonca-c9d77.web.app/)

## Technologies Used

- **Frontend**: React and Typescript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **State Management**: Redux 
  
## Project Setup

### Prerequisites

To run this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version)
- [MongoDB](https://www.mongodb.com/) (For local development or you can use MongoDB Atlas for cloud database hosting)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/lonca-dashboard.git
    ```

2. **Frontend Setup**:

    Navigate to the `frontend` directory and install the dependencies:

    ```bash
    cd frontend
    npm install
    ```

3. **Backend Setup**:

    Navigate to the `backend` directory and install the dependencies:

    ```bash
    cd backend
    npm install
    ```

4. **Environment Variables**:

    - Create a `.env` file in the `backend` directory and add your MongoDB connection URI and port:

      ```
      MONGODB_URI=your-mongodb-uri
      PORT=8080
      ```

    - You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) to set up a free database if you don't have a local MongoDB instance.

### Running the Project

1. **Start the Backend**:

    Navigate to the `backend` directory and run:

    ```bash
    npm start
    ```

    This will start the backend server on `http://localhost:8080`.

2. **Start the Frontend**:

    Navigate to the `frontend` directory and run:

    ```bash
    npm start
    ```

    This will start the React app on `http://localhost:5173`.

3. **Open the Application**:

    Once both the backend and frontend are running, open your browser and go to:

    [http://localhost:5173](http://localhost:5173)

    You should now be able to interact with the dashboard, view monthly sales graphs, and check the product sales table.

## Features

- **Monthly Sales Graph**: Visualizes the sales of each product on a monthly basis.
- **Product Sales Table**: A table displaying all-time sales data for every product, showing the total quantity sold and total money gained.
