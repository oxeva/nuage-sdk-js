import NuageError from '../NuageError';

export default class NewsletterNotFound extends NuageError {
    constructor(args) {
        super(args, 'Your newsletter does not exist.');

        this.name = 'NewsletterNotFound';
    }
}
