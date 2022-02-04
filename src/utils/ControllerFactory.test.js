import ControllerFactory from './ControllerFactory';
import AuthController from '../controllers/AuthController';
import ContractController from '../controllers/ContractController';
import CouponController from '../controllers/CouponController';
import CustomerController from '../controllers/CustomerController';
import FlavorController from '../controllers/FlavorController';
import ImageController from '../controllers/ImageController';
import InvitationController from '../controllers/InvitationController';
import InvoiceController from '../controllers/InvoiceController';
import IpController from '../controllers/IpController';
import ItemController from '../controllers/ItemController';
import KeypairController from '../controllers/KeypairController';
import MetricController from '../controllers/MetricController';
import NewsletterController from '../controllers/NewsletterController';
import OrganizationController from '../controllers/OrganizationController';
import OrganizationLimitController from '../controllers/OrganizationLimitController';
import PasswordController from '../controllers/PasswordController';
import PaymentMethodController from '../controllers/PaymentMethodController';
import ProductController from '../controllers/ProductController';
import ProductPriceController from '../controllers/ProductPriceController';
import ProjectController from '../controllers/ProjectController';
import ProjectLimitController from '../controllers/ProjectLimitController';
import ProjectUsageController from '../controllers/ProjectUsageController';
import RoleController from '../controllers/RoleController';
import SecurityGroupController from '../controllers/SecurityGroupController';
import SecurityRuleController from '../controllers/SecurityRuleController';
import ServerController from '../controllers/ServerController';
import SponsorshipController from '../controllers/SponsorshipController';
import UserController from '../controllers/UserController';

describe('ControllerFactory', () => {
    it('should throw an error', () => {
        const controller = 'fakeController';

        expect(() => {
            ControllerFactory.use(controller);
        }).toThrowError(
            new Error(`The ${controller} controller does not exists`),
        );
    });

    it('should get a Controller', () => {
        const controllers = [
            ['auth', AuthController],
            ['contract', ContractController],
            ['coupon', CouponController],
            ['customer', CustomerController],
            ['flavor', FlavorController],
            ['image', ImageController],
            ['invitation', InvitationController],
            ['invoice', InvoiceController],
            ['ip', IpController],
            ['item', ItemController],
            ['keypair', KeypairController],
            ['metric', MetricController],
            ['newsletter', NewsletterController],
            ['organization', OrganizationController],
            ['organizationLimit', OrganizationLimitController],
            ['password', PasswordController],
            ['paymentMethod', PaymentMethodController],
            ['product', ProductController],
            ['productPrice', ProductPriceController],
            ['project', ProjectController],
            ['projectLimit', ProjectLimitController],
            ['projectUsage', ProjectUsageController],
            ['role', RoleController],
            ['securityGroup', SecurityGroupController],
            ['securityRule', SecurityRuleController],
            ['server', ServerController],
            ['sponsorship', SponsorshipController],
            ['user', UserController],
        ];

        controllers.forEach(([name, controller]) => {
            expect(ControllerFactory.use(name)).toBeInstanceOf(controller);
        });
    });
});
