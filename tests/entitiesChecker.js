const shouldBe = (entity, data) => {
    switch (entity) {
    case 'organization': {
        expect(data.description).toBeDefined();
        expect(data.name).toBeDefined();
        expect(data.state).toBeDefined();
        expect(data.createdAt).toBeDefined();
        expect(data.sponsorship).toBeTrue();
        break;
    }
    case 'project': {
        expect(data.id).toBeDefined();
        expect(data.createdAt).toBeDefined();
        expect(data.description).toBeDefined();
        expect(data.driverType).toBeDefined();
        expect(data.name).toBeDefined();

        break;
    }
    case 'keypair': {
        expect(data.id).toBeDefined();
        expect(data.createdAt).toBeDefined();
        expect(data.description).toBeDefined();
        expect(data.isDefault).toBeFalse();
        expect(data.md5).toBeDefined();
        expect(data.name).toBeDefined();
        expect(data.publicKey).toBeDefined();
        expect(data.sha256).toBeDefined();
        break;
    }
    case 'ip': {
        expect(data.id).toBeDefined();
        expect(data.address).toBeDefined();
        expect(data.addressFamily).toBeDefined();
        expect(data.project).toBeDefined();
        expect(data.server).toBeDefined();
        expect(data.type).toBeDefined();
        break;
    }
    case 'server': {
        expect(data.id).toBeDefined();
        expect(data.createdAt).toBeDefined();
        expect(data.description).toBeDefined();
        expect(data.flavor).toBeDefined();
        expect(data.image).toBeDefined();
        expect(data.ips).toBeArray();
        expect(data.keypair).toBeUndefined();
        expect(data.name).toBeDefined();
        expect(data.project).toBeDefined();
        expect(data.securityGroups).toBeArray();
        expect(data.state).toBeDefined();
        expect(data.status).toBeDefined();
        break;
    }
    case 'sponsorship': {
        expect(data.id).toBeUndefined();
        expect(data.sponsor).toBeUndefined();
        expect(data.value).toBeInteger();
        break;
    }
    case 'sponsorshipLog': {
        expect(data.id).toBeUndefined();
        expect(data.targetOrganization).toBeUndefined();
        expect(data.createdAt).toBeUndefined();
        expect(data.payedAt).toBeUndefined();
        expect(data.amount).toBeUndefined();
        expect(data.currency).toBeDefined();
        expect(data.state).toBeUndefined();
        expect(data.reason).toBeUndefined();
        break;
    }
    default:
        break;
    }
};

export default shouldBe;
