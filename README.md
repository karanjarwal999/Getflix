# Netflix Clone

Welcome to the Netflix Clone project! This is a dynamic web application built using React, Redux, Firebase, and the TMDB API. It allows users to explore a collection of movies, watch trailers, add movies to their list, and more. Below, you'll find a detailed guide on setting up the project and its features.

**Live Demo**: [visit](https://papaya-quokka-0c2e99.netlify.app)

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Setup](#setup)

## Features

1. **User Authentication:**
   - Users can sign up and log in using their email and password via Firebase authentication.

2. **Movie Pages:**
   - Browse through a collection of movies categorized as "New Releases" and "Popular."
   - Click on a movie to view its details.

3. **Watch Trailers:**
   - Play movie trailers fetched from the YouTube API by clicking on the trailer button.

4. **My List:**
   - Add movies to your watchlist for easy access.

5. **Dynamic Rendering:**
   - All content is dynamically rendered based on data from the TMDB API.

6. **Redux State Management:**
   - State management is handled using Redux to ensure efficient data flow and application-wide state management.

7. **Responsive UI:**
   - The application is designed with a responsive user interface that works seamlessly across various devices.

## Usage

1. signup page/login page 
   - if you are new you will be redirected to the signup page where you can create your account or use login as guest 
   - if you already have an account you can login from the login page 

2. Home Page
   - after login or signup, you will get to the Home page where you can see movies by category or  you can navigate to different pages as per your choice like - movies, new and popular, my list, browse by language and etc.
   
3. Movie popup
   - On clicking any movie a new modal will be visible where movie video will be played automatically.
   - click the PLAY button to play a video on the full screen or  ADD (+) a button to add the movie to the list
   - you will see some info about the movie followed by some more movies belonging to the same category
  
## Technologies Used
   - React
   - Redux
   - Firebase (Authentication)
   - TMDB API
   - YouTube API ( to play videos)

## Screenshots 


### Signup Page
![Screenshot 2023-08-22 080002](https://github.com/karanjarwal999/Getflix/assets/119421686/3e69c442-7a3f-4270-8624-09bad2f58f10)
<hr>

### Login Page
![Screenshot 2023-08-22 080027](https://github.com/karanjarwal999/Getflix/assets/119421686/0218fd75-29ce-4082-a4c8-8018142b44da)
<hr>

### Home Page
![Screenshot 2023-08-22 080101](https://github.com/karanjarwal999/Getflix/assets/119421686/d770bd21-a085-4992-997b-78d989a9d7be)
<hr>

### Popup Modal on clicking the movie <br/>
![Screenshot 2023-08-22 080153](https://github.com/karanjarwal999/Getflix/assets/119421686/f7d1cd16-d5f0-4b57-b638-8051899877c3)
<hr>

### Movie Page
![Screenshot 2023-08-22 080336](https://github.com/karanjarwal999/Getflix/assets/119421686/e984d1d2-347f-4255-b94e-b72643c4b030)
<hr>

### My List Page
![Screenshot 2023-08-22 080315](https://github.com/karanjarwal999/Getflix/assets/119421686/a10e7b63-6a96-432e-a548-73b43dfddf64)
<hr>

### By language Page
![Screenshot 2023-08-22 122434](https://github.com/karanjarwal999/Getflix/assets/119421686/1a0d1125-afe6-4597-9459-9f2e86f3151d)
<hr>


## Setup

Follow these steps to set up and run the Netflix Clone project on your local machine:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/netflix-clone.git
   cd netflix-clone```
   
2. Install Dependencies:
   ```bash
   npm install
   ```

3. Environment Variables:
   Create a .env file in the root of your project.
   Set your environment variables in the .env file. Here's an example:
   ```plaintext
   REACT_APP_TMDB_API_KEY = TMDB-api-key
   REACT_APP_TMDB_AUTH = TMDB-Authorization-key
   REACT_APP_YOUTUBE_API = google-youtube-api-key
   
   // firebase
   // You will get this all in Firebase settings
   REACT_APP_FIREBASE_API_KEY = your-firebase-api-key
   REACT_APP_FIREBASE_AUTH_DOMAIN = your-auth-domain
   REACT_APP_FIREBASE_PROJECT_ID = your-project-id
   REACT_APP_FIREBASE_DATABASE_URL= firebase-data-url
   REACT_APP_FIREBASE_STORAGE_BUCKET = your-storage-bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID = your-messaging-sender-id
   REACT_APP_FIREBASE_APP_ID = your-app-id
   ```
4. Start the Development Server:
   ```bash
   npm run start
   ```

5. Access the App:

   Open your browser and navigate to http://localhost:3000 to access the Netflix Clone app.

6. Authentication:

   You can sign up or log in using your email and password via Firebase authentication.<br/>
   For testing, you can use the "Login as Guest" option if you have implemented it.

## Explore and Enjoy!
Browse movies, watch trailers, and explore the various features of the Netflix Clone project.

