<h1 align="center">
  <br>
    Soundclash
    <h3 align="left">
        <i>An application designed to help you find your favorite song amongst your favorite songs.</i>
        <br></br>
        <i>Pit your top songs against each other in an elimination style tournament where you determine the winner.</i>
    </h3>
    <br></br>
</h1>

![image](https://user-images.githubusercontent.com/60834712/224577786-ca7d334a-84ca-4cab-ae82-0513e9022070.png)

## tech stack

### APIs used

![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white)

### core

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

### database

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

### setup & configuration

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)

### see the app in action

![Screen_Recording_2023-03-12_at_3_33_03_PM_AdobeExpress](https://user-images.githubusercontent.com/60834712/224578188-9ae62760-c1b9-4076-a189-5a86a48a05d1.gif)

## 🚀 getting started

## prerequisites

In order to use this app, you must create an app in the spotify developer console. find it here: https://developer.spotify.com/dashboard/

You may name the app anything in your spotify dev console.

## things you will need:

1. Spotify Client ID
2. Spotify Client Secret
3. Add 'http://127.0.0.1:5173/api/callback' to your App's list of Redirect URIs in the spotify dev page.

## setting up your dev environment:

1. fork and clone the project
2. navigate to the server directory
3. create a .env file and add below to it:

```
PORT = 3001 (CAN BE ANY PORT YOU WANT THE SERVER TO LISTEN ON)
CLIENT_ID = (YOUR SPOTIFY CLIENT ID HERE)
CLIENT_SECRET = (YOUR SPOTIFY CLIENT SECRET HERE)
redirect_uri = 'http://127.0.0.1:5173/api/callback'
```

4. `npm install` in the server directory
5. navigate back to the project's root directory and `npm install`
6. in your browser, navigate to `http://localhost:5173/`
7. log in with your spotify credentials.
8. choose between your favorite songs until only 1 is left!
