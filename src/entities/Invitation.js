import { invitationCustomErrors } from '../errors/entitiesError';
import Logger from '../utils/Logger';
import trimUrl from '../utils/trimUrl';
import { URL_INVITATIONS } from '../utils/urls';
import Entity from './Entity';

export default class Invitation extends Entity {
    constructor(entity = {}) {
        super();

        Logger.debug('Invitation.constructor()', { entity });

        const {
            id,
            firstname,
            lastname,
            email,
            password,
            organizationDescription,
            organizationBillingDescription,
            organizationName,
            organizationAddress,
            organizationZipcode,
            organizationCity,
            organizationCountry,
            organizationVAT,
            contract,
            contractSigned,
            organization,
            createdBy,
            validUntil,
            validFrom,
            roles,
            status,
            lastUpdate,
            extensions,
            coupon,
            sponsor,
            newsletter,
        } = entity;

        this.id = trimUrl(id);
        this.contract = trimUrl(contract);
        this.contractSigned = contractSigned;
        this.createdBy = trimUrl(createdBy);
        this.email = email;
        this.extensions = extensions;
        this.lastUpdate = lastUpdate;
        this.firstname = firstname;
        this.lastname = lastname;
        this.organizationAddress = organizationAddress;
        this.organizationCity = organizationCity;
        this.organizationCountry = organizationCountry;
        this.organizationDescription = organizationDescription;
        this.organizationBillingDescription = organizationBillingDescription;
        this.organizationName = organizationName;
        this.organizationVAT = organizationVAT;
        this.organizationZipcode = organizationZipcode;
        this.organization = trimUrl(organization);
        this.password = password;
        this.status = status;
        this.validFrom = validFrom;
        this.coupon = coupon;
        this.validUntil = validUntil;
        this.roles = roles;
        this.sponsor = sponsor;
        this.newsletter = newsletter || false;

        this.className = 'Invitation';
        this.url = URL_INVITATIONS;
        this.customErrors = invitationCustomErrors;
        this.original = { ...this };
    }

    flush() {
        Logger.debug('Invitation.flush()');

        return super.flush(null, 'patch');
    }
}
