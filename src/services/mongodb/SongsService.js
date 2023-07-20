const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const Song = require('./schema/Song');

class SongsService {
    async addSong(song) {
        const newSong = new Song(song);
        const savedSong = await newSong.save();
        if (!savedSong) {
            throw new InvariantError('Gagal menambahkan lagu');
        }
        return savedSong._id;
    }

    async getSongs(sortOptions) {
        const songs = await Song.find().sort(sortOptions);
        return songs;
    }

    async getSongById(id) {
        const song = await Song.findById(id);
        if (!song) {
            throw new NotFoundError('Lagu tidak ditemukan');
        }
        return song;
    }

    async deleteSongById(id) {
        const song = await Song.findByIdAndDelete(id);
        if (!song) {
            throw new NotFoundError('Lagu tidak ditemukan');
        }
        return song;
    }

    async incrementPlayCountSongById(id) {
        const song = await Song.findByIdAndUpdate(
            id,
            { $inc: { play_count: 1 } },
            { new: true }
        );
        if (!song) {
            throw new NotFoundError('Lagu tidak ditemukan');
        }
        return song;
    }
}

module.exports = SongsService;
