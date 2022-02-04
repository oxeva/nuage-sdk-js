/* eslint-disable jest/no-conditional-expect */
import EntityFactory from './EntityFactory';
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
import User from '../entities/User';

describe('EntityFactory', () => {
    const entities = [
        ['contract', Contract],
        ['coupon', Coupon],
        ['customer', Customer],
        ['flavor', Flavor],
        ['image', Image],
        ['invitation', Invitation],
        ['invoice', Invoice],
        ['ip', Ip],
        ['item', Item],
        ['keypair', Keypair],
        ['metric', Metric],
        ['newsletter', Newsletter],
        ['organization', Organization],
        ['organizationLimit', OrganizationLimit],
        ['password', Password],
        ['paymentMethod', PaymentMethod],
        ['product', Product],
        ['productPrice', ProductPrice],
        ['project', Project],
        ['projectLimit', ProjectLimit],
        ['projectUsage', ProjectUsage],
        ['role', Role],
        ['securityGroup', SecurityGroup],
        ['securityRule', SecurityRule],
        ['server', Server],
        ['sponsorship', Sponsorship],
        ['user', User],
    ];

    it('.use() should return "null"', () => {
        expect(EntityFactory.use('foo')).toBeNull();
    });

    it('.use() should get an Entity', () => {
        entities.forEach(([name, Entity]) => {
            expect(EntityFactory.use(name)).toEqual(Entity);
        });
    });

    it('.getName() should return nothing', () => {
        expect(EntityFactory.getName('foo')).toBeEmpty();
    });

    it('.getName() should get the entity name', () => {
        entities.forEach(([name, Entity]) => {
            if (name === 'metric') {
                expect(EntityFactory.getName(new Entity([]))).toStrictEqual(
                    name,
                );
            } else {
                expect(EntityFactory.getName(new Entity())).toStrictEqual(name);
            }
        });
    });
});
