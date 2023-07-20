class PlaylistsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
        this.postSongToPlaylistHandler =
            this.postSongToPlaylistHandler.bind(this);
        this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
        this.getPlaylistByIdHandler = this.getPlaylistByIdHandler.bind(this);
        this.deletePlaylistByIdHandler =
            this.deletePlaylistByIdHandler.bind(this);
    }

    async postPlaylistHandler(req, res, next) {
        try {
            this._validator.validatePlaylistPayload(req.body);
            const playlistId = await this._service.addPlaylist(req.body);
            res.status(201).json({
                status: true,
                message: 'Berhasil menambahkan playlist',
                data: {
                    addedPlaylistId: playlistId,
                },
            });
        } catch (err) {
            next(err);
        }
    }

    async postSongToPlaylistHandler(req, res, next) {
        const { id } = req.params;
        try {
            this._validator.validatePlaylistSongPayload(req.body);
            await this._service.addSongToPlaylist({
                playlistId: id,
                ...req.body,
            });
            res.status(201).json({
                status: true,
                message: 'Berhasil menambahkan song ke playlist',
            });
        } catch (err) {
            next(err);
        }
    }

    async getPlaylistsHandler(req, res, next) {
        try {
            const playlists = await this._service.getPlaylists();
            res.status(200).json({
                status: true,
                message: 'Berhasil mengambil playlist',
                count: playlists.length,
                data: playlists,
            });
        } catch (err) {
            next(err);
        }
    }

    async getPlaylistByIdHandler(req, res, next) {
        const { id } = req.params;
        try {
            const playlist = await this._service.getPlaylistById(id);
            res.status(200).json({
                status: true,
                message: 'Berhasil mengambil playlist',
                data: playlist,
            });
        } catch (err) {
            next(err);
        }
    }

    async deletePlaylistByIdHandler(req, res, next) {
        const { id } = req.params;
        try {
            const playlistId = await this._service.deletePlaylistById(id);
            res.status(200).json({
                status: true,
                message: 'Berhasil menghapus playlist',
                data: {
                    removedPlaylistId: playlistId,
                },
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = PlaylistsHandler;
