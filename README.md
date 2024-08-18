# Queue Management App

## Overview

This React application is designed for managing and interacting with message queues. Users can view available queues, select one, and fetch messages from it. The app features a design similar to Voyantis, with capabilities to view the list of queues and the number of messages in each, select a queue to fetch messages, and dynamically update message counts without needing to refetch the entire list.

## Technologies Used

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Styling:** CSS

## Installation and Setup

### Prerequisites

Ensure you have Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

### Backend Setup

1. Clone the repository or download the backend code:

    ```bash
    git clone <repository-url>
    cd backend
    ```

2. Install the necessary packages:

    ```bash
    npm install
    ```

3. Start the backend server:

    ```bash
    node index.js
    ```

    The server will run on [http://localhost:3000](http://localhost:3000).

### Frontend Setup

1. Clone the repository or download the frontend code:

    ```bash
    git clone <repository-url>
    cd frontend
    ```

2. Install the necessary packages:

    ```bash
    npm install
    ```

3. Start the Vite development server:

    ```bash
    npm run dev
    ```

    The frontend will be available at [http://localhost:5173](http://localhost:5173).

## API Endpoints

### Fetch All Queues

- **URL:** `/api/queues`
- **Method:** `GET`
- **Description:** Retrieves the list of all available queues with their message counts.

### Add Message to Queue

- **URL:** `/api/:queue_name`
- **Method:** `POST`
- **Body:**

    ```json
    {
      "message": "Your message here"
    }
    ```

- **Description:** Adds a new message to the specified queue. Replace `:queue_name` with the name of the queue.

### Fetch Message from Queue

- **URL:** `/api/:queue_name`
- **Method:** `GET`
- **Query Parameters:**
  - `timeout`: Optional query parameter to specify the timeout in milliseconds. Defaults to 10000ms (10 seconds).

- **Description:** Retrieves the next message from the specified queue. Returns `204 No Content` if no message is available after the timeout.

## Frontend Usage

1. Open the app in your browser at [http://localhost:5173](http://localhost:5173).
2. View the list of available queues.
3. Select a queue by clicking the "Select" button next to it.
4. Click the "Go" button to fetch and view a message from the selected queue.

.
