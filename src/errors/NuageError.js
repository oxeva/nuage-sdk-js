export default class NuageError {
    constructor(args, message) {
        Object.entries(args).forEach(([key, value]) => {
            if (key.startsWith('@') || key === 'violations') {
                return;
            }

            const prop = key.replace(/^hydra:/, '');

            // Remove some information from API
            if (['trace', 'title'].includes(key)) {
                return;
            }

            // Transform code property by status
            if (key === 'code') {
                this.status = value;
            } else {
                this[prop] = value;
            }
        });

        if (message) {
            this.message = message;
        }

        this.date = new Date().toISOString();
        // this.name = this.constructor.name;
        this.name = 'NuageError';
    }
}
