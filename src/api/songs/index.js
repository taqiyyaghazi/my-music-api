const routes = require('./routes');
const SongsHandler = require('./handlers');

module.exports = (service, validator) => {
    const songsHandlers = new SongsHandler(service, validator);
    return routes(songsHandlers);
};
