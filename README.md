# 🎮 **Chill Gamer - Server**

Welcome to the **Chill Gamer Server** repository! This server powers the Chill Gamer application, handling API requests, user reviews, and watchlist functionalities using MongoDB for data storage.

---

## 🔗 **Live API Endpoint**

Base URL: `http://localhost:5000` ()

---

## ✨ **Features**

- 🔄 **Add Reviews:** Allows users to post reviews for their favorite games.
- 🔠 **Retrieve Top-Rated Games:** Fetches games sorted by highest ratings.
- 🔎 **Fetch All Reviews:** Provides a list of all reviews.
- 🎮 **User-Specific Reviews:** Retrieves reviews created by a specific user.
- 🌐 **Review Details:** Fetches detailed information for a single review.
- 🔒 **User Watchlist:** Enables users to manage their personalized watchlist.
- ✉️ **Update Reviews:** Allows users to update existing reviews.
- ❌ **Delete Reviews:** Enables users to delete reviews from the database.

---

## 📚 **API Endpoints**

### ✚ **Add a Review**

**POST** `/add-review`

- **Description:** Add a new game review.
- **Request Body:**
  ```json
  {
    "userEmail": "example@gmail.com",
    "gameTitle": "Game Name",
    "reviewDescription": "Amazing gameplay and graphics!",
    "rating": 5
  }
  ```
- **Response:**
  ```json
  {
    "acknowledged": true,
    "insertedId": "<newly created review ID>"
  }
  ```

### 🌟 **Get Top-Rated Games**

**GET** `/top-rated-games`

- **Description:** Retrieves the top 6 highest-rated games.
- **Response:**
  ```json
  [
    {
      "_id": "<game ID>",
      "gameTitle": "Game Name",
      "rating": 5
    }
  ]
  ```

### 🔄 **Get All Reviews**

**GET** `/all-reviews`

- **Description:** Fetches all game reviews.
- **Response:**
  ```json
  [
    {
      "_id": "<review ID>",
      "userEmail": "example@gmail.com",
      "gameTitle": "Game Name",
      "reviewDescription": "Great game!",
      "rating": 5
    }
  ]
  ```

### 🔍 **Get Reviews by User**

**GET** `/my-reviews/:userEmail`

- **Description:** Retrieves all reviews created by a specific user.
- **Response:**
  ```json
  [
    {
      "_id": "<review ID>",
      "gameTitle": "Game Name",
      "reviewDescription": "Awesome experience!",
      "rating": 5
    }
  ]
  ```

### ℹ️ **Get Review Details**

**GET** `/reviews/:id`

- **Description:** Fetches detailed information for a single review.
- **Response:**
  ```json
  {
    "_id": "<review ID>",
    "gameTitle": "Game Name",
    "reviewDescription": "Fantastic gameplay!",
    "rating": 5
  }
  ```

### 🎮 **Add to Watchlist**

**POST** `/watchlist`

- **Description:** Adds a game to the user’s watchlist.
- **Request Body:**
  ```json
  {
    "reviewId": "<review ID>",
    "gameTitle": "Game Name",
    "userEmail": "example@gmail.com",
    "userName": "John Doe"
  }
  ```
- **Response:**
  ```json
  {
    "acknowledged": true,
    "insertedId": "<newly created watchlist item ID>"
  }
  ```

### 🔎 **Get Watchlist by User**

**GET** `/my-watchlist/:userEmail`

- **Description:** Retrieves the watchlist for a specific user.
- **Response:**
  ```json
  [
    {
      "reviewId": "<review ID>",
      "gameTitle": "Game Name",
      "dateAdded": "2025-01-08T15:00:00.000Z",
      "rating": 5
    }
  ]
  ```

### 🗓 **Update Review**

**PUT** `/reviews/:id`

- **Description:** Updates an existing review.
- **Request Body:**
  ```json
  {
    "reviewDescription": "Updated description",
    "rating": 4
  }
  ```
- **Response:**
  ```json
  {
    "_id": "<review ID>",
    "reviewDescription": "Updated description",
    "rating": 4
  }
  ```

### ❌ **Delete Review**

**DELETE** `/reviews/:id`

- **Description:** Deletes a review by its ID.
- **Response:**
  ```json
  {
    "message": "Review deleted successfully"
  }
  ```

---

## 🛠️ **Setup Instructions**

### Prerequisites

- Node.js
- MongoDB Atlas Account

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/chill-gamer-server.git
   cd chill-gamer-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add:

   ```plaintext
   DB_USER=your_database_user
   DB_PASS=your_database_password
   PORT=5000
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Visit the server at `http://localhost:5000`.

---

## 📊 **Dependencies**

- **express:** Fast, unopinionated, minimalist web framework for Node.js
- **mongodb:** Official MongoDB driver for Node.js
- **dotenv:** Loads environment variables from a `.env` file
- **cors:** Middleware to enable Cross-Origin Resource Sharing

---

## 🌐 **Environment Variables**

The following environment variables are required:

- `DB_USER`: MongoDB database username
- `DB_PASS`: MongoDB database password
- `PORT`: Port number for the server (default: 5000)

---

## 🔧 **Project Structure**

```plaintext
chill-gamer-server/
├── node_modules/        # Installed dependencies
├── .env                 # Environment variables
├── index.js             # Main server file
├── package.json         # Project metadata and scripts
├── README.md            # Documentation (this file)
```

---

## 🚀 **Contributing**

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

---
