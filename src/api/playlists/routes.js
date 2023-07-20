const routes = (handler) => {
    const router = require('express').Router();
  
    router.post('/', handler.postPlaylistHandler);
    router.post('/:id/songs', handler.postSongToPlaylistHandler);
    router.get('/', handler.getPlaylistsHandler);
    router.get('/:id', handler.getPlaylistByIdHandler);
    router.delete('/:id', handler.deletePlaylistByIdHandler);
  
    return router;
  };
  
  module.exports = routes;
  