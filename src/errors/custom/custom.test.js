import InvoiceNotFullyPaid from './InvoiceNotFullyPaid';
import InvoiceUncollectible from './InvoiceUncollectible';

describe('custom errors', () => {
    it('should instanciate InvoiceNotFullyPaid', () => {
        const error = new InvoiceNotFullyPaid({});

        expect(error).toBeInstanceOf(InvoiceNotFullyPaid);
        expect(error.message).toStrictEqual(
            'Invoice still not fully paid.',
        );
        expect(error.name).toStrictEqual('InvoiceNotFullyPaid');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate InvoiceUncollectible', () => {
        const error = new InvoiceUncollectible({});

        expect(error).toBeInstanceOf(InvoiceUncollectible);
        expect(error.message).toStrictEqual(
            'Invoice is a draft or uncollectible.',
        );
        expect(error.name).toStrictEqual('InvoiceUncollectible');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });
});
