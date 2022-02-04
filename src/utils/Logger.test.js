import Logger from './Logger';
import LOG from './logLevel';

describe('Logger', () => {
    window.console.log = jest.fn();

    it('should log only error', () => {
        Logger.config(LOG.ERROR);

        Logger.error(123);
        expect(window.console.log).toHaveBeenCalledTimes(1);
        Logger.warn('foo');
        Logger.notice({ foo: 'bar' });
        Logger.info(['foo']);
        Logger.debug(false);
        expect(window.console.log).toHaveBeenCalledTimes(1);
    });

    it('should log only warn', () => {
        Logger.config(LOG.WARN);

        Logger.warn('foo');
        expect(window.console.log).toHaveBeenCalledTimes(2); // increase from previous call
        Logger.error(123);
        Logger.notice({ foo: 'bar' });
        Logger.info(['foo']);
        Logger.debug(false);
        expect(window.console.log).toHaveBeenCalledTimes(2);
    });

    it('should log only notice', () => {
        Logger.config(LOG.NOTICE);

        Logger.notice({ foo: 'bar' });
        expect(window.console.log).toHaveBeenCalledTimes(3); // increase from previous call
        Logger.error(123);
        Logger.warn('foo');
        Logger.info(['foo']);
        Logger.debug(false);
        expect(window.console.log).toHaveBeenCalledTimes(3);
    });

    it('should log only info', () => {
        Logger.config(LOG.INFO);

        Logger.info(['foo']);
        expect(window.console.log).toHaveBeenCalledTimes(4); // increase from previous call
        Logger.error(123);
        Logger.warn('foo');
        Logger.notice({ foo: 'bar' });
        Logger.debug(false);
        expect(window.console.log).toHaveBeenCalledTimes(4);
    });

    it('should log only debug', () => {
        Logger.config(LOG.DEBUG);

        Logger.debug(false);
        expect(window.console.log).toHaveBeenCalledTimes(5); // increase from previous call
        Logger.error(123);
        Logger.warn('foo');
        Logger.notice({ foo: 'bar' });
        Logger.info(['foo']);
        expect(window.console.log).toHaveBeenCalledTimes(5);
    });
});
