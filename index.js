const express = require('express');
const app = express();
app.use(express.static('public')); // to link the css style sheet
// require('dotenv').config();

app.get('/', (req, res) => {
    res.sendFile('/public/index.html', { root: __dirname });
});

// To login or register
app.get('/registerLogin', (req, res) => {
    res.sendFile('/public/registerLogin.html', { root: __dirname });
});

// To send verify email
app.get('/verifyEmail', (req, res) => {
    res.sendFile('/public/verifyEmail.html', { root: __dirname });
});

// To reset password
app.get('/resetPass', (req, res) => {
    res.sendFile('/public/resetPass.html', { root: __dirname });
});

//For game page
app.get('/game', (req, res) => {
    res.sendFile('/public/game.html', { root: __dirname });
});

//For campaign page
app.get('/campaign', (req, res) => {
    res.sendFile('/public/campaign.html', { root: __dirname });
});

// To game store
app.get('/gameStore', (req, res) => {
    res.sendFile('/public/gameStore.html', { root: __dirname });
});

// To lucky draw page
app.get('/luckyDraw', (req, res) => {
    res.sendFile('/public/luckyDraw.html', { root: __dirname });
});

// To inventory page
app.get('/inventory', (req, res) => {
    res.sendFile('/public/inventory.html', { root: __dirname });
});

//for profile page
app.get('/profile', (req, res) => {
    res.sendFile('/public/profile.html', { root: __dirname });
});

//for leadership page
app.get('/leaderboard', (req, res) => {
    res.sendFile('/public/leaderboard.html', { root: __dirname });
});

//for friends page
app.get('/friends', (req, res) => {
    res.sendFile('/public/friendsList.html', { root: __dirname });
});

//for friends page
app.get('/search', (req, res) => {
    res.sendFile('/public/searchForPlayers.html', { root: __dirname });
});

//for friends page
app.get('/friendRequest', (req, res) => {
    res.sendFile('/public/friendRequest.html', { root: __dirname });
});

app.get('/home', (req, res) => {
    res.sendFile('/public/home.html', { root: __dirname });
});

// To view past record
app.get('/pastRecord', (req, res) => {
    res.sendFile('/public/pastRecord.html', { root: __dirname });
});

// const PORT = process.env.PORT || 3001; // client side port, 3000 is server side

// app.listen(PORT, () => {
//     console.log(`Server started and accessible via ${PORT}`);
// });

// For netlify
module.exports = app;
