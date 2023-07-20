const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    artists: [
        {
            name: {
                type: String,
                required: true,
            },
        },
    ],
    url: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    play_count: {
        type: Number,
        default: 0,
    },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
