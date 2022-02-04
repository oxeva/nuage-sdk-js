import CouponNotFound from './CouponNotFound';
import CustomerNotFound from './CustomerNotFound';
import FlavorNotFound from './FlavorNotFound';
import ImageNotFound from './ImageNotFound';
import InvitationNotFound from './InvitationNotFound';
import InvoiceNotFound from './InvoiceNotFound';
import IpNotFound from './IpNotFound';
import ItemNotFound from './ItemNotFound';
import KeypairNotFound from './KeypairNotFound';
import NewsletterNotFound from './NewsletterNotFound';
import OrganizationNotFound from './OrganizationNotFound';
import OrganizationLimitNotFound from './OrganizationLimitNotFound';
import PasswordNotFound from './PasswordNotFound';
import PaymentMethodNotFound from './PaymentMethodNotFound';
import ProductNotFound from './ProductNotFound';
import ProductPriceNotFound from './ProductPriceNotFound';
import ProjectNotFound from './ProjectNotFound';
import ProjectLimitNotFound from './ProjectLimitNotFound';
import ProjectUsageNotFound from './ProjectUsageNotFound';
import RoleNotFound from './RoleNotFound';
import SecurityGroupNotFound from './SecurityGroupNotFound';
import SecurityRuleNotFound from './SecurityRuleNotFound';
import ServerNotFound from './ServerNotFound';
import SponsorshipNotFound from './SponsorshipNotFound';
import SponsorshipLogNotFound from './SponsorshipLogNotFound';
import TokenNotFound from './TokenNotFound';
import RefreshTokenNotFound from './RefreshTokenNotFound';
import UserNotFound from './UserNotFound';

describe('notFoundError', () => {
    it('should instanciate CouponNotFound', () => {
        const error = new CouponNotFound({});

        expect(error).toBeInstanceOf(CouponNotFound);
        expect(error.message).toStrictEqual('Your coupon does not exists.');
        expect(error.name).toStrictEqual('CouponNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate CustomerNotFound', () => {
        const error = new CustomerNotFound({});

        expect(error).toBeInstanceOf(CustomerNotFound);
        expect(error.message).toStrictEqual('Your customer does not exists.');
        expect(error.name).toStrictEqual('CustomerNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate FlavorNotFound', () => {
        const error = new FlavorNotFound({});

        expect(error).toBeInstanceOf(FlavorNotFound);
        expect(error.message).toStrictEqual('Your flavor does not exists.');
        expect(error.name).toStrictEqual('FlavorNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate ImageNotFound', () => {
        const error = new ImageNotFound({});

        expect(error).toBeInstanceOf(ImageNotFound);
        expect(error.message).toStrictEqual('Your image does not exists.');
        expect(error.name).toStrictEqual('ImageNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate InvitationNotFound', () => {
        const error = new InvitationNotFound({});

        expect(error).toBeInstanceOf(InvitationNotFound);
        expect(error.message).toStrictEqual('Your invitation does not exists.');
        expect(error.name).toStrictEqual('InvitationNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate InvoiceNotFound', () => {
        const error = new InvoiceNotFound({});

        expect(error).toBeInstanceOf(InvoiceNotFound);
        expect(error.message).toStrictEqual('Your invoice does not exists.');
        expect(error.name).toStrictEqual('InvoiceNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate IpNotFound', () => {
        const error = new IpNotFound({});

        expect(error).toBeInstanceOf(IpNotFound);
        expect(error.message).toStrictEqual('Your IP does not exists.');
        expect(error.name).toStrictEqual('IpNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate ItemNotFound', () => {
        const error = new ItemNotFound({});

        expect(error).toBeInstanceOf(ItemNotFound);
        expect(error.message).toStrictEqual('Your item does not exists.');
        expect(error.name).toStrictEqual('ItemNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate KeypairNotFound', () => {
        const error = new KeypairNotFound({});

        expect(error).toBeInstanceOf(KeypairNotFound);
        expect(error.message).toStrictEqual('Your keypair does not exists.');
        expect(error.name).toStrictEqual('KeypairNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate NewsletterNotFound', () => {
        const error = new NewsletterNotFound({});

        expect(error).toBeInstanceOf(NewsletterNotFound);
        expect(error.message).toStrictEqual('Your newsletter does not exist.');
        expect(error.name).toStrictEqual('NewsletterNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate OrganizationNotFound', () => {
        const error = new OrganizationNotFound({});

        expect(error).toBeInstanceOf(OrganizationNotFound);
        expect(error.message).toStrictEqual(
            'Your organization does not exists.',
        );
        expect(error.name).toStrictEqual('OrganizationNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate OrganizationLimitNotFound', () => {
        const error = new OrganizationLimitNotFound({});

        expect(error).toBeInstanceOf(OrganizationLimitNotFound);
        expect(error.message).toStrictEqual(
            "Your organization's quota does not exists.",
        );
        expect(error.name).toStrictEqual('OrganizationLimitNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate PasswordNotFound', () => {
        const error = new PasswordNotFound({});

        expect(error).toBeInstanceOf(PasswordNotFound);
        expect(error.message).toStrictEqual(
            'This password change token is expired or does not exist.',
        );
        expect(error.name).toStrictEqual('PasswordNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate PaymentMethodNotFound', () => {
        const error = new PaymentMethodNotFound({});

        expect(error).toBeInstanceOf(PaymentMethodNotFound);
        expect(error.message).toStrictEqual(
            'Your payment method does not exists.',
        );
        expect(error.name).toStrictEqual('PaymentMethodNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate ProductNotFound', () => {
        const error = new ProductNotFound({});

        expect(error).toBeInstanceOf(ProductNotFound);
        expect(error.message).toStrictEqual('Your project does not exists.');
        expect(error.name).toStrictEqual('ProductNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate ProductPriceNotFound', () => {
        const error = new ProductPriceNotFound({});

        expect(error).toBeInstanceOf(ProductPriceNotFound);
        expect(error.message).toStrictEqual(
            "Your product's price does not exists.",
        );
        expect(error.name).toStrictEqual('ProductPriceNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate ProjectNotFound', () => {
        const error = new ProjectNotFound({});

        expect(error).toBeInstanceOf(ProjectNotFound);
        expect(error.message).toStrictEqual('Your project does not exists.');
        expect(error.name).toStrictEqual('ProjectNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate ProjectLimitNotFound', () => {
        const error = new ProjectLimitNotFound({});

        expect(error).toBeInstanceOf(ProjectLimitNotFound);
        expect(error.message).toStrictEqual(
            "Your project's quota does not exists.",
        );
        expect(error.name).toStrictEqual('ProjectLimitNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate ProjectUsageNotFound', () => {
        const error = new ProjectUsageNotFound({});

        expect(error).toBeInstanceOf(ProjectUsageNotFound);
        expect(error.message).toStrictEqual(
            "Your project's usage does not exists.",
        );
        expect(error.name).toStrictEqual('ProjectUsageNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate RoleNotFound', () => {
        const error = new RoleNotFound({});

        expect(error).toBeInstanceOf(RoleNotFound);
        expect(error.message).toStrictEqual('Your role does not exists.');
        expect(error.name).toStrictEqual('RoleNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate SecurityGroupNotFound', () => {
        const error = new SecurityGroupNotFound({});

        expect(error).toBeInstanceOf(SecurityGroupNotFound);
        expect(error.message).toStrictEqual(
            'Your security group does not exists.',
        );
        expect(error.name).toStrictEqual('SecurityGroupNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate SecurityRuleNotFound', () => {
        const error = new SecurityRuleNotFound({});

        expect(error).toBeInstanceOf(SecurityRuleNotFound);
        expect(error.message).toStrictEqual(
            'Your security rule does not exists.',
        );
        expect(error.name).toStrictEqual('SecurityRuleNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate ServerNotFound', () => {
        const error = new ServerNotFound({});

        expect(error).toBeInstanceOf(ServerNotFound);
        expect(error.message).toStrictEqual('Your server does not exists.');
        expect(error.name).toStrictEqual('ServerNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate SponsorshipNotFound', () => {
        const error = new SponsorshipNotFound({});

        expect(error).toBeInstanceOf(SponsorshipNotFound);
        expect(error.message).toStrictEqual(
            'Your sponsorship does not exists.',
        );
        expect(error.name).toStrictEqual('SponsorshipNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate SponsorshipLogNotFound', () => {
        const error = new SponsorshipLogNotFound({});

        expect(error).toBeInstanceOf(SponsorshipLogNotFound);
        expect(error.message).toStrictEqual(
            'Your sponsorship log does not exists.',
        );
        expect(error.name).toStrictEqual('SponsorshipLogNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate TokenNotFound', () => {
        const error = new TokenNotFound({});

        expect(error).toBeInstanceOf(TokenNotFound);
        expect(error.message).toStrictEqual(
            'Cannot find a user with your email/password.',
        );
        expect(error.name).toStrictEqual('TokenNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate RefreshTokenNotFound', () => {
        const error = new RefreshTokenNotFound({});

        expect(error).toBeInstanceOf(RefreshTokenNotFound);
        expect(error.message).toStrictEqual(
            'Your refresh token is invalid or expired.',
        );
        expect(error.name).toStrictEqual('RefreshTokenNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate UserNotFound', () => {
        const error = new UserNotFound({});

        expect(error).toBeInstanceOf(UserNotFound);
        expect(error.message).toStrictEqual('Your user does not exists.');
        expect(error.name).toStrictEqual('UserNotFound');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });
});
