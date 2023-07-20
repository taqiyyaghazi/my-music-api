const InvariantError = require('../../exceptions/InvariantError');
const Playlist = require('./schema/Playlist');
const Song = require('./schema/Song');

class PlaylistsService {
    async addPlaylist(playlist) {
        const newPlaylist = new Playlist(playlist);
        const savedPlaylist = await newPlaylist.save();
        if (!savedPlaylist) {
            throw new InvariantError('Gagal menambahkan playlist');
        }
        return savedPlaylist._id;
    }

    async addSongToPlaylist({ playlistId, songId }) {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
            throw new InvariantError('Playlist tidak ditemukan');
        }
        const song = await Song.findById(songId);
        if (!song) {
            throw new InvariantError('Song tidak ditemukan');
        }
        playlist.songs.push(song);
        const savedPlaylist = await playlist.save();
        if (!savedPlaylist) {
            throw new InvariantError('Gagal menambahkan song ke playlist');
        }
        return savedPlaylist;
    }

    async getPlaylists() {
        const playlists = await Playlist.find().populate('songs');
        return playlists;
    }

    async getPlaylistById(playlistId) {
        const playlist = await Playlist.findById(playlistId).populate('songs');
        if (!playlist) {
            throw new InvariantError('Playlist tidak ditemukan');
        }
        return playlist;
    }

    async deletePlaylistById(playlistId) {
        const playlist = await Playlist.findByIdAndDelete(playlistId);
        if (!playlist) {
            throw new InvariantError('Playlist tidak ditemukan');
        }
        return playlist._id;
    }
}

module.exports = PlaylistsService;
