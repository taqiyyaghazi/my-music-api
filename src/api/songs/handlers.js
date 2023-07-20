class SongsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postSongHandler = this.postSongHandler.bind(this);
        this.getSongsHandler = this.getSongsHandler.bind(this);
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
    }

    async postSongHandler(req, res, next) {
        try {
            this._validator.validateSongPayload(req.body);

            const songId = await this._service.addSong(req.body);

            res.status(201).json({
                status: true,
                message: 'Berhasil menambahkan lagu',
                data: {
                    addedSongId: songId,
                },
            });
        } catch (err) {
            next(err);
        }
    }

    async getSongsHandler(req, res) {
        const { sortBy, sortOrder } = req.query;

        let sortOptions = {};
        if (sortBy && sortOrder) {
            sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }

        const songs = await this._service.getSongs(sortOptions);

        res.status(200).json({
            status: true,
            message: 'Berhasil mendapatkan lagu',
            count: songs.length,
            data: songs,
        });
    }

    async getSongByIdHandler(req, res, next) {
        const { id } = req.params;

        try {
            const song = await this._service.getSongById(id);
            await this._service.incrementPlayCountSongById(id);

            res.status(200).json({
                status: true,
                message: 'Berhasil mendapatkan lagu',
                data: song,
            });
        } catch (err) {
            next(err);
        }
    }

    async deleteSongByIdHandler(req, res, next) {
        const { id } = req.params;

        try {
            await this._service.deleteSongById(id);

            res.status(200).json({
                status: true,
                message: 'Berhasil menghapus lagu',
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = SongsHandler;
