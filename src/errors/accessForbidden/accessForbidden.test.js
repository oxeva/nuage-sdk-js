import CustomerAccessForbidden from './CustomerAccessForbidden';
import FlavorAccessForbidden from './FlavorAccessForbidden';
import ImageAccessForbidden from './ImageAccessForbidden';
import InvitationAccessForbidden from './InvitationAccessForbidden';
import InvoiceAccessForbidden from './InvoiceAccessForbidden';
import IpAccessForbidden from './IpAccessForbidden';
import ItemAccessForbidden from './ItemAccessForbidden';
import KeypairAccessForbidden from './KeypairAccessForbidden';
import MetricAccessForbidden from './MetricAccessForbidden';
import OrganizationAccessForbidden from './OrganizationAccessForbidden';
import OrganizationLimitAccessForbidden from './OrganizationLimitAccessForbidden';
import PasswordAccessForbidden from './PasswordAccessForbidden';
import PaymentMethodAccessForbidden from './PaymentMethodAccessForbidden';
import ProductAccessForbidden from './ProductAccessForbidden';
import ProductPriceAccessForbidden from './ProductPriceAccessForbidden';
import ProjectAccessForbidden from './ProjectAccessForbidden';
import ProjectLimitAccessForbidden from './ProjectLimitAccessForbidden';
import ProjectUsageAccessForbidden from './ProjectUsageAccessForbidden';
import RoleAccessForbidden from './RoleAccessForbidden';
import SecurityGroupAccessForbidden from './SecurityGroupAccessForbidden';
import SecurityRuleAccessForbidden from './SecurityRuleAccessForbidden';
import ServerAccessForbidden from './ServerAccessForbidden';
import SponsorshipAccessForbidden from './SponsorshipAccessForbidden';
import SponsorshipLogAccessForbidden from './SponsorshipLogAccessForbidden';
import UserAccessForbidden from './UserAccessForbidden';

describe('accessForbidden errors', () => {
    it('should instanciate CustomerAccessForbidden', () => {
        const error = new CustomerAccessForbidden({});

        expect(error).toBeInstanceOf(CustomerAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate customers.',
        );
        expect(error.name).toStrictEqual('CustomerAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate FlavorAccessForbidden', () => {
        const error = new FlavorAccessForbidden({});

        expect(error).toBeInstanceOf(FlavorAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate flavors.',
        );
        expect(error.name).toStrictEqual('FlavorAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate ImageAccessForbidden', () => {
        const error = new ImageAccessForbidden({});

        expect(error).toBeInstanceOf(ImageAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate images.',
        );
        expect(error.name).toStrictEqual('ImageAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate InvitationAccessForbidden', () => {
        const error = new InvitationAccessForbidden({});

        expect(error).toBeInstanceOf(InvitationAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate invitations.',
        );
        expect(error.name).toStrictEqual('InvitationAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate InvoiceAccessForbidden', () => {
        const error = new InvoiceAccessForbidden({});

        expect(error).toBeInstanceOf(InvoiceAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate invoices.',
        );
        expect(error.name).toStrictEqual('InvoiceAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate IpAccessForbidden', () => {
        const error = new IpAccessForbidden({});

        expect(error).toBeInstanceOf(IpAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate IP.',
        );
        expect(error.name).toStrictEqual('IpAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate ItemAccessForbidden', () => {
        const error = new ItemAccessForbidden({});

        expect(error).toBeInstanceOf(ItemAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate items.',
        );
        expect(error.name).toStrictEqual('ItemAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate KeypairAccessForbidden', () => {
        const error = new KeypairAccessForbidden({});

        expect(error).toBeInstanceOf(KeypairAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate keypairs.',
        );
        expect(error.name).toStrictEqual('KeypairAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate MetricAccessForbidden', () => {
        const error = new MetricAccessForbidden({});

        expect(error).toBeInstanceOf(MetricAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate metrics.',
        );
        expect(error.name).toStrictEqual('MetricAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate OrganizationAccessForbidden', () => {
        const error = new OrganizationAccessForbidden({});

        expect(error).toBeInstanceOf(OrganizationAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate organizations.',
        );
        expect(error.name).toStrictEqual('OrganizationAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate OrganizationLimitAccessForbidden', () => {
        const error = new OrganizationLimitAccessForbidden({});

        expect(error).toBeInstanceOf(OrganizationLimitAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate quotas of the organizations.',
        );
        expect(error.name).toStrictEqual('OrganizationLimitAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate PasswordAccessForbidden', () => {
        const error = new PasswordAccessForbidden({});

        expect(error).toBeInstanceOf(PasswordAccessForbidden);
        expect(error.message).toBeUndefined();
        expect(error.name).toStrictEqual('PasswordAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate PaymentMethodAccessForbidden', () => {
        const error = new PaymentMethodAccessForbidden({});

        expect(error).toBeInstanceOf(PaymentMethodAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate payment methods.',
        );
        expect(error.name).toStrictEqual('PaymentMethodAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate ProductAccessForbidden', () => {
        const error = new ProductAccessForbidden({});

        expect(error).toBeInstanceOf(ProductAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate products.',
        );
        expect(error.name).toStrictEqual('ProductAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate ProductPriceAccessForbidden', () => {
        const error = new ProductPriceAccessForbidden({});

        expect(error).toBeInstanceOf(ProductPriceAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate prices of the products.',
        );
        expect(error.name).toStrictEqual('ProductPriceAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate ProjectAccessForbidden', () => {
        const error = new ProjectAccessForbidden({});

        expect(error).toBeInstanceOf(ProjectAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate projects.',
        );
        expect(error.name).toStrictEqual('ProjectAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate ProjectLimitAccessForbidden', () => {
        const error = new ProjectLimitAccessForbidden({});

        expect(error).toBeInstanceOf(ProjectLimitAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate quotas of the projects.',
        );
        expect(error.name).toStrictEqual('ProjectLimitAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate ProjectUsageAccessForbidden', () => {
        const error = new ProjectUsageAccessForbidden({});

        expect(error).toBeInstanceOf(ProjectUsageAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate usages of the projects.',
        );
        expect(error.name).toStrictEqual('ProjectUsageAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate RoleAccessForbidden', () => {
        const error = new RoleAccessForbidden({});

        expect(error).toBeInstanceOf(RoleAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate roles.',
        );
        expect(error.name).toStrictEqual('RoleAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate SecurityGroupAccessForbidden', () => {
        const error = new SecurityGroupAccessForbidden({});

        expect(error).toBeInstanceOf(SecurityGroupAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate security groups.',
        );
        expect(error.name).toStrictEqual('SecurityGroupAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate SecurityRuleAccessForbidden', () => {
        const error = new SecurityRuleAccessForbidden({});

        expect(error).toBeInstanceOf(SecurityRuleAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate security rules.',
        );
        expect(error.name).toStrictEqual('SecurityRuleAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate ServerAccessForbidden', () => {
        const error = new ServerAccessForbidden({});

        expect(error).toBeInstanceOf(ServerAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate servers.',
        );
        expect(error.name).toStrictEqual('ServerAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate SponsorshipAccessForbidden', () => {
        const error = new SponsorshipAccessForbidden({});

        expect(error).toBeInstanceOf(SponsorshipAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate sponsorships.',
        );
        expect(error.name).toStrictEqual('SponsorshipAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate SponsorshipLogAccessForbidden', () => {
        const error = new SponsorshipLogAccessForbidden({});

        expect(error).toBeInstanceOf(SponsorshipLogAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate sponsorshiplogs.',
        );
        expect(error.name).toStrictEqual('SponsorshipLogAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });

    it('should instanciate UserAccessForbidden', () => {
        const error = new UserAccessForbidden({});

        expect(error).toBeInstanceOf(UserAccessForbidden);
        expect(error.message).toStrictEqual(
            'You are not allowed to manipulate users.',
        );
        expect(error.name).toStrictEqual('UserAccessForbidden');
        expect(error.date).toBeDateString();
        expect(new Date(error.date)).toBeValidDate();
    });
});
