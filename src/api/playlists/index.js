const routes = require('./routes');
const PlaylistsHandler = require('./handlers');

module.exports = (service, validator) => {
    const playlistsHandlers = new PlaylistsHandler(service, validator);
    return routes(playlistsHandlers);
};
