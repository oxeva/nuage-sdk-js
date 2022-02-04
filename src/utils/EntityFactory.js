import Contract from '../entities/Contract';
import Coupon from '../entities/Coupon';
import Customer from '../entities/Customer';
import Flavor from '../entities/Flavor';
import Image from '../entities/Image';
import Invitation from '../entities/Invitation';
import Invoice from '../entities/Invoice';
import Ip from '../entities/Ip';
import Item from '../entities/Item';
import Keypair from '../entities/Keypair';
import Metric from '../entities/Metric';
import Newsletter from '../entities/Newsletter';
import Organization from '../entities/Organization';
import OrganizationLimit from '../entities/OrganizationLimit';
import Password from '../entities/Password';
import PaymentMethod from '../entities/PaymentMethod';
import Product from '../entities/Product';
import ProductPrice from '../entities/ProductPrice';
import Project from '../entities/Project';
import ProjectLimit from '../entities/ProjectLimit';
import ProjectUsage from '../entities/ProjectUsage';
import Role from '../entities/Role';
import SecurityGroup from '../entities/SecurityGroup';
import SecurityRule from '../entities/SecurityRule';
import Server from '../entities/Server';
import Sponsorship from '../entities/Sponsorship';
import SponsorshipLog from '../entities/SponsorshipLog';
import User from '../entities/User';

export default class EntityFactory {
    static use(name) {
        switch (name) {
        case 'contract':
            return Contract;
        case 'coupon':
            return Coupon;
        case 'customer':
            return Customer;
        case 'flavor':
            return Flavor;
        case 'image':
            return Image;
        case 'invitation':
            return Invitation;
        case 'invoice':
            return Invoice;
        case 'ip':
            return Ip;
        case 'item':
            return Item;
        case 'keypair':
            return Keypair;
        case 'metric':
            return Metric;
        case 'newsletter':
            return Newsletter;
        case 'organization':
            return Organization;
        case 'organizationLimit':
            return OrganizationLimit;
        case 'password':
            return Password;
        case 'paymentMethod':
            return PaymentMethod;
        case 'product':
            return Product;
        case 'productPrice':
            return ProductPrice;
        case 'project':
            return Project;
        case 'projectLimit':
            return ProjectLimit;
        case 'projectUsage':
            return ProjectUsage;
        case 'role':
            return Role;
        case 'securityGroup':
            return SecurityGroup;
        case 'securityRule':
            return SecurityRule;
        case 'server':
            return Server;
        case 'sponsorship':
            return Sponsorship;
        case 'sponsorshipLog':
            return SponsorshipLog;
        case 'user':
            return User;
        default:
            return null;
        }
    }

    static getName(entity) {
        if (entity instanceof Contract) {
            return 'contract';
        }
        if (entity instanceof Coupon) {
            return 'coupon';
        }
        if (entity instanceof Customer) {
            return 'customer';
        }
        if (entity instanceof Flavor) {
            return 'flavor';
        }
        if (entity instanceof Image) {
            return 'image';
        }
        if (entity instanceof Invitation) {
            return 'invitation';
        }
        if (entity instanceof Invoice) {
            return 'invoice';
        }
        if (entity instanceof Ip) {
            return 'ip';
        }
        if (entity instanceof Item) {
            return 'item';
        }
        if (entity instanceof Keypair) {
            return 'keypair';
        }
        if (entity instanceof Metric) {
            return 'metric';
        }
        if (entity instanceof Newsletter) {
            return 'newsletter';
        }
        if (entity instanceof Organization) {
            return 'organization';
        }
        if (entity instanceof OrganizationLimit) {
            return 'organizationLimit';
        }
        if (entity instanceof Password) {
            return 'password';
        }
        if (entity instanceof PaymentMethod) {
            return 'paymentMethod';
        }
        if (entity instanceof Product) {
            return 'product';
        }
        if (entity instanceof ProductPrice) {
            return 'productPrice';
        }
        if (entity instanceof Project) {
            return 'project';
        }
        if (entity instanceof ProjectLimit) {
            return 'projectLimit';
        }
        if (entity instanceof ProjectUsage) {
            return 'projectUsage';
        }
        if (entity instanceof Role) {
            return 'role';
        }
        if (entity instanceof SecurityGroup) {
            return 'securityGroup';
        }
        if (entity instanceof SecurityRule) {
            return 'securityRule';
        }
        if (entity instanceof Server) {
            return 'server';
        }
        if (entity instanceof Sponsorship) {
            return 'sponsorship';
        }
        if (entity instanceof User) {
            return 'user';
        }

        return '';
    }
}
