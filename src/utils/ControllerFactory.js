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
import SponsorshipLogController from '../controllers/SponsorshipLogController';
import UserController from '../controllers/UserController';

export default class ControllerFactory {
    static use(name) {
        switch (name) {
        case 'auth':
            return new AuthController();
        case 'contract':
            return new ContractController();
        case 'coupon':
            return new CouponController();
        case 'customer':
            return new CustomerController();
        case 'flavor':
            return new FlavorController();
        case 'image':
            return new ImageController();
        case 'invitation':
            return new InvitationController();
        case 'invoice':
            return new InvoiceController();
        case 'ip':
            return new IpController();
        case 'item':
            return new ItemController();
        case 'keypair':
            return new KeypairController();
        case 'metric':
            return new MetricController();
        case 'newsletter':
            return new NewsletterController();
        case 'organization':
            return new OrganizationController();
        case 'organizationLimit':
            return new OrganizationLimitController();
        case 'password':
            return new PasswordController();
        case 'paymentMethod':
            return new PaymentMethodController();
        case 'product':
            return new ProductController();
        case 'productPrice':
            return new ProductPriceController();
        case 'project':
            return new ProjectController();
        case 'projectLimit':
            return new ProjectLimitController();
        case 'projectUsage':
            return new ProjectUsageController();
        case 'role':
            return new RoleController();
        case 'securityGroup':
            return new SecurityGroupController();
        case 'securityRule':
            return new SecurityRuleController();
        case 'server':
            return new ServerController();
        case 'sponsorship':
            return new SponsorshipController();
        case 'sponsorshipLog':
            return new SponsorshipLogController();
        case 'user':
            return new UserController();
        default:
            throw new Error(`The ${name} controller does not exists`);
        }
    }
}
