import { state } from './state';
import VARS from '../variables';

const { payloads: PAYLOADS } = VARS;

export const authPayload = {};

export const contractPayload = {};

export const couponPayload = {};

export const customerPayload = {};

export const flavorPayload = () => ({
    name: PAYLOADS.flavor.post.name,
    ram: PAYLOADS.flavor.post.ram,
    core: PAYLOADS.flavor.post.core,
    disk: PAYLOADS.flavor.post.disk,
    isPublic: PAYLOADS.flavor.post.isPublic,
});

export const imagePayload = () => ({
    name: PAYLOADS.image.post.name,
    description: PAYLOADS.image.post.description,
    osAdminUser: PAYLOADS.image.post.osAdminUser,
    osName: PAYLOADS.image.post.osName,
    osVersion: PAYLOADS.image.post.osVersion,
    isPublic: PAYLOADS.image.post.isPublic,
});

export const invitationPayload = () => ({
    email: PAYLOADS.invitation.post.email,
});

export const invoicePayload = {};

export const ipPayload = {};

export const itemPayload = {};

export const keypairPayload = ({ role }) => ({
    user: `arya/users/${state.account[role].id}`,
    publicKey: PAYLOADS.keypair.post.publicKey,
    description: PAYLOADS.keypair.post.description,
});

export const metricPayload = {};

export const organizationPayload = {};

export const organizationLimitPayload = {};

export const passwordPayload = {};

export const paymentMethodPayload = () => ({
    type: 'card',
});

export const productPayload = {};

export const productPricePayload = {};

export const projectPayload = ({ orga }) => ({
    description: PAYLOADS.project.post.description,
    organization: `arya/organizations/${
        state.organizations.find((o) => o.description === orga).id
    }`,
});

export const projectLimitPayload = {};

export const projectUsagePayload = {};

export const rolePayload = {};

export const securityGroupPayload = {};

export const securityRulePayload = {};

export const serverPayload = {};

export const sponsorshipPayload = {};

export const sponsorshipLogPayload = {};

export const userPayload = {};
