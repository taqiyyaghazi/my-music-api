require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const playlists = require('./api/playlists');
const PlaylistsService = require('./services/mongodb/PlaylistsService');
const PlaylistsValidator = require('./validator/playlists');

const songs = require('./api/songs');
const SongsService = require('./services/mongodb/SongsService');
const SongsValidator = require('./validator/songs');

const app = express();
const port = 3000;

const playlistsService = new PlaylistsService();
const songsService = new SongsService();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/playlists', playlists(playlistsService, PlaylistsValidator));
app.use('/songs', songs(songsService, SongsValidator));

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: false,
        message: 'Not found',
    });
});

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({
        status: false,
        message: err.message,
    });
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then((res) => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});

module.exports = app
