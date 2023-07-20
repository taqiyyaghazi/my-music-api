const routes = (handler) => {
    const router = require('express').Router();

    router.post('/', handler.postSongHandler);
    router.get('/', handler.getSongsHandler);
    router.get('/:id', handler.getSongByIdHandler);
    router.delete('/:id', handler.deleteSongByIdHandler);

    return router;
};

module.exports = routes;
