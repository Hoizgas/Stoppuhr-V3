const utils = require('@iobroker/adapter-core');
class StoppuhrAdapter extends utils.Adapter {
    constructor(options) {
        super({...options, name: 'stoppuhr'});
        this.on('ready', this.onReady.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }

    async onReady() {
        this.log.info('Stoppuhr Adapter ist gestartet');
        // Beispiel-Datenpunkt anlegen
        await this.setObjectNotExistsAsync('data.zeit', {
            type: 'state',
            common: {
                name: 'Letzte gemessene Zeit',
                type: 'number',
                role: 'value',
                read: true,
                write: false
            },
            native: {}
        });
        await this.setStateAsync('data.zeit', { val: 0, ack: true });
    }

    onUnload(callback) {
        try {
            this.log.info('Adapter wird gestoppt');
            callback();
        } catch (e) {
            callback();
        }
    }
}

if (require.main !== module) {
    module.exports = (options) => new StoppuhrAdapter(options);
} else {
    new StoppuhrAdapter();
}