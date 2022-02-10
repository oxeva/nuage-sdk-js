import EventSource from './EventSource';
import Request from './Request';
import ControllerFactory from './utils/ControllerFactory';
import EntityFactory from './utils/EntityFactory';
import Logger from './utils/Logger';

export default class Client {
    #controllers = null;

    constructor() {
        this.config();

        this.#controllers = ControllerFactory;
    }

    /**
     * Set client configuration
     */
    config(config = {}) {
        Logger.config(config.log_level);

        if (config.baseUrl) {
            Request.baseUrl = config.baseUrl;
        }

        if (config.percentageError) {
            Request.percentageError = config.percentageError;
        }

        if (config.onRefreshTokenChange) {
            Request.onRefreshTokenChange = config.onRefreshTokenChange;
        }

        Logger.debug('Client.config()', { config });

        return this;
    }

    /**
     * Get current token
     */
    getToken(callback) {
        callback(Request.refreshToken);
        return this;
    }

    /**
     * Check if organization exists
     */
    checkOrganization(organization = {}) {
        Logger.debug('Client.checkOrganization()', { organization });

        return this.#controllers.use('organization').verify(organization.name);
    }

    checkSponsorship(filters) {
        Logger.debug('Client.checkSponsorship()', { filters });

        return this.#controllers.use('sponsorship').verify(filters.id);
    }

    /**
     * Use credential to retrieve token
     */
    login(credential = {}) {
        Logger.debug('Client.login()', { credential });

        return this.#controllers.use('auth').login(credential);
    }

    /**
     * Set authorization to use API
     */
    auth(token = {}) {
        Logger.debug('Client.auth()', { token });

        return this.#controllers.use('auth').refresh(token);
    }

    /**
     * Signs email used with crisp chatbox to verify identity
     */
    signCrispEmail() {
        Logger.debug('Client.signCrispEmail()');

        return this.#controllers.use('auth').signCrispEmail();
    }

    /**
     * Signs email used with upvoty to auto-login
     */
    signUpvotyEmail() {
        Logger.debug('Client.signUpvotyEmail()');

        return this.#controllers.use('auth').signUpvotyEmail();
    }

    /**
     * Disconnect
     */
    logout() {
        Logger.debug('Client.logout()');

        this.#controllers.use('auth').logout();

        return this;
    }

    /**
     * Unsubscribe all mercure events
     */
    unsubscribe() {
        EventSource.unsubscribe();

        return this;
    }

    /**
     * Persist the entity
     */
    persist(entity) {
        Logger.debug('Client.persist()', { entity });

        // Retrieve name of entity
        const entityName = EntityFactory.getName(entity);

        // Entity reference
        const entityRef = this[`#${entityName}`];

        // Entity returned after the post
        const Entity = this.#controllers
            .use(entityName)
            .post(entity, entityRef);

        return Entity;
    }

    /**
     * Capture an unpaid invoice
     */
    captureInvoice(filters) {
        Logger.debug('Client.captureInvoice()', { filters });

        return this.#controllers
            .use('invoice')
            .captureInvoice(filters);
    }

    /**
     * Retrieve a contract
     */
    contract(filters) {
        Logger.debug('Client.contract()', { filters });

        return this.#controllers
            .use('contract')
            .getById(filters.id, EntityFactory.use('contract'));
    }

    /**
     * Retrieve contracts
     */
    contracts(filters = {}) {
        Logger.debug('Client.contracts()', { filters });

        return this.#controllers
            .use('contract')
            .getAll(EntityFactory.use('contract'), filters);
    }

    /**
     * Retrieve a coupon
     */
    coupon(filters) {
        Logger.debug('Client.coupon()', { filters });

        return this.#controllers
            .use('coupon')
            .getByName(filters.name, EntityFactory.use('coupon'));
    }

    /**
     * Retrieve coupons
     */
    coupons(filters = {}) {
        Logger.debug('Client.coupons()', { filters });

        return this.#controllers
            .use('coupon')
            .getAll(EntityFactory.use('coupon'), filters);
    }

    /**
     * Retrieve a customer
     */
    customer(filters) {
        Logger.debug('Client.customer()', { filters });

        return this.#controllers
            .use('customer')
            .getById(filters.id, EntityFactory.use('customer'));
    }

    /**
     * Retrieve customers
     */
    customers(filters = {}) {
        Logger.debug('Client.customers()', { filters });

        return this.#controllers
            .use('customer')
            .getAll(EntityFactory.use('customer'), filters);
    }

    /**
     * Retrieve a flavor
     */
    flavor(filters) {
        Logger.debug('Client.flavor()', { filters });

        return this.#controllers
            .use('flavor')
            .getById(filters.id, EntityFactory.use('flavor'));
    }

    /**
     * Retrieve flavors
     */
    flavors(filters = {}) {
        Logger.debug('Client.flavors()', { filters });

        return this.#controllers
            .use('flavor')
            .getAll(EntityFactory.use('flavor'), filters);
    }

    /**
     * Retrieve an image
     */
    image(filters) {
        Logger.debug('Client.image()', { filters });

        return this.#controllers
            .use('image')
            .getById(filters.id, EntityFactory.use('image'));
    }

    /**
     * Retrieve images
     */
    images(filters = {}) {
        Logger.debug('Client.images()', { filters });

        return this.#controllers
            .use('image')
            .getAll(EntityFactory.use('image'), filters);
    }

    /**
     * Retrieve an invitation
     */
    invitation(filters) {
        Logger.debug('Client.invitation()', { filters });

        return this.#controllers
            .use('invitation')
            .getById(filters.id, EntityFactory.use('invitation'));
    }

    /**
     * Retrieve invitations
     */
    invitations(filters = {}) {
        Logger.debug('Client.invitations()', { filters });

        return this.#controllers
            .use('invitation')
            .getAll(EntityFactory.use('invitation'), filters);
    }

    /**
     * Retrieve an invoice
     */
    invoice(filters) {
        Logger.debug('Client.invoice()', { filters });

        return this.#controllers
            .use('invoice')
            .getById(filters.id, EntityFactory.use('invoice'));
    }

    /**
     * Retrieve invoices
     */
    invoices(filters = {}) {
        Logger.debug('Client.invoices()', { filters });

        return this.#controllers
            .use('invoice')
            .getAll(EntityFactory.use('invoice'), filters);
    }

    /**
     * Retrieve an ip
     */
    ip(filters) {
        Logger.debug('Client.ip()', { filters });

        return this.#controllers
            .use('ip')
            .getById(filters.id, EntityFactory.use('ip'));
    }

    /**
     * Retrieve ips
     */
    ips(filters = {}) {
        Logger.debug('Client.ips()', { filters });

        return this.#controllers
            .use('ip')
            .getAll(EntityFactory.use('ip'), filters);
    }

    /**
     * Retrieve an item
     */
    item(filters) {
        Logger.debug('Client.item()', { filters });

        return this.#controllers
            .use('item')
            .getById(filters.id, EntityFactory.use('item'));
    }

    /**
     * Retrieve items
     */
    items(filters = {}) {
        Logger.debug('Client.items()', { filters });

        return this.#controllers
            .use('item')
            .getAll(EntityFactory.use('item'), filters);
    }

    /**
     * Retrieve a keypair
     */
    keypair(filters) {
        Logger.debug('Client.keypair()', { filters });

        return this.#controllers
            .use('keypair')
            .getById(filters.id, EntityFactory.use('keypair'));
    }

    /**
     * Retrieve keypairs
     */
    keypairs(filters = {}) {
        Logger.debug('Client.keypairs()', { filters });

        return this.#controllers
            .use('keypair')
            .getAll(EntityFactory.use('keypair'), filters);
    }

    /**
     * Retrieve a metric
     */
    metric() {
        Logger.debug('Client.metric()');

        return this.#controllers.use('metric').getAll();
    }

    /**
     * Retrieve metrics
     */
    metrics(filters = {}) {
        Logger.debug('Client.metrics()', { filters });

        return this.#controllers.use('metric').post(filters);
    }

    /**
     * Retrieve an organization
     */
    organization(filters) {
        Logger.debug('Client.organization()', { filters });

        return this.#controllers
            .use('organization')
            .getById(filters.id, EntityFactory.use('organization'));
    }

    /**
     * Retrieve organizations
     */
    organizations(filters = {}) {
        Logger.debug('Client.organizations()', { filters });

        return this.#controllers
            .use('organization')
            .getAll(EntityFactory.use('organization'), filters);
    }

    /**
     * Retrieve an organization limit
     */
    organizationLimit(filters) {
        Logger.debug('Client.organizationLimit()', { filters });

        return this.#controllers
            .use('organizationLimit')
            .getById(filters.id, EntityFactory.use('organizationLimit'));
    }

    /**
     * Retrieve organizations limits
     */
    organizationLimits(filters = {}) {
        Logger.debug('Client.organizationLimits()', { filters });

        return this.#controllers
            .use('organizationLimit')
            .getAll(EntityFactory.use('organizationLimit'), filters);
    }

    /**
     * Retrieve a password
     */
    password(filters = {}) {
        Logger.debug('Client.password()', { filters });

        return this.#controllers
            .use('password')
            .getById(filters.id, EntityFactory.use('password'));
    }

    /**
     * Retrieve a paymentMethod
     */
    paymentMethod(filters) {
        Logger.debug('Client.paymentMethod()', { filters });

        return this.#controllers
            .use('paymentMethod')
            .getById(filters.id, EntityFactory.use('paymentMethod'));
    }

    /**
     * Retrieve paymentMethods
     */
    paymentMethods(filters = {}) {
        Logger.debug('Client.paymentMethods()', { filters });

        return this.#controllers
            .use('paymentMethod')
            .getAll(EntityFactory.use('paymentMethod'), filters);
    }

    /**
     * Retrieve a product
     */
    product(filters) {
        Logger.debug('Client.product()', { filters });

        return this.#controllers
            .use('product')
            .getById(filters.id, EntityFactory.use('product'));
    }

    /**
     * Retrieve products
     */
    products(filters = {}) {
        Logger.debug('Client.products()', { filters });

        return this.#controllers
            .use('product')
            .getAll(EntityFactory.use('product'), filters);
    }

    /**
     * Retrieve a product price
     */
    productPrice(filters) {
        Logger.debug('Client.productPrice()', { filters });

        return this.#controllers
            .use('productPrice')
            .getById(filters.id, EntityFactory.use('productPrice'));
    }

    /**
     * Retrieve product prices
     */
    productPrices(filters = {}) {
        Logger.debug('Client.productPrices()', { filters });

        return this.#controllers
            .use('productPrice')
            .getAll(EntityFactory.use('productPrice'), filters);
    }

    /**
     * Retrieve a project
     */
    project(filters) {
        Logger.debug('Client.project()', { filters });

        return this.#controllers
            .use('project')
            .getById(filters.id, EntityFactory.use('project'));
    }

    /**
     * Retrieve projects
     */
    projects(filters = {}) {
        Logger.debug('Client.projects()', { filters });

        return this.#controllers
            .use('project')
            .getAll(EntityFactory.use('project'), filters);
    }

    /**
     * Retrieve a project limit
     */
    projectLimit(filters) {
        Logger.debug('Client.projectLimit()', { filters });

        return this.#controllers
            .use('projectLimit')
            .getById(filters.id, EntityFactory.use('projectLimit'));
    }

    /**
     * Retrieve projects limits
     */
    projectLimits(filters = {}) {
        Logger.debug('Client.projectLimits()', { filters });

        return this.#controllers
            .use('projectLimit')
            .getAll(EntityFactory.use('projectLimit'), filters);
    }

    /**
     * Retrieve a project usage
     */
    projectUsage(filters) {
        Logger.debug('Client.projectUsage()', { filters });

        return this.#controllers
            .use('projectUsage')
            .getById(filters.id, EntityFactory.use('projectUsage'));
    }

    /**
     * Retrieve projects usages
     */
    projectUsages(filters = {}) {
        Logger.debug('Client.projectUsages()', { filters });

        return this.#controllers
            .use('projectUsage')
            .getAll(EntityFactory.use('projectUsage'), filters);
    }

    /**
     * Retrieve a role
     */
    role(filters) {
        Logger.debug('Client.role()', { filters });

        return this.#controllers
            .use('role')
            .getById(filters.id, EntityFactory.use('role'));
    }

    /**
     * Retrieve roles
     */
    roles(filters = {}) {
        Logger.debug('Client.roles()', { filters });

        return this.#controllers
            .use('role')
            .getAll(EntityFactory.use('role'), filters);
    }

    /**
     * Retrieve a security group
     */
    securityGroup(filters) {
        Logger.debug('Client.securityGroup()', { filters });

        return this.#controllers
            .use('securityGroup')
            .getById(filters.id, EntityFactory.use('securityGroup'));
    }

    /**
     * Retrieve security groups
     */
    securityGroups(filters = {}) {
        Logger.debug('Client.securityGroups()', { filters });

        return this.#controllers
            .use('securityGroup')
            .getAll(EntityFactory.use('securityGroup'), filters);
    }

    /**
     * Retrieve a security rule
     */
    securityRule(filters) {
        Logger.debug('Client.securityRule()', { filters });

        return this.#controllers
            .use('securityRule')
            .getById(filters.id, EntityFactory.use('securityRule'));
    }

    /**
     * Retrieve security rules
     */
    securityRules(filters = {}) {
        Logger.debug('Client.securityRules()', { filters });

        return this.#controllers
            .use('securityRule')
            .getAll(EntityFactory.use('securityRule'), filters);
    }

    /**
     * Retrieve a server
     */
    server(filters) {
        Logger.debug('Client.server()', { filters });

        return this.#controllers
            .use('server')
            .getById(filters.id, EntityFactory.use('server'));
    }

    /**
     * Retrieve servers
     */
    servers(filters = {}) {
        Logger.debug('Client.servers()', { filters });

        return this.#controllers
            .use('server')
            .getAll(EntityFactory.use('server'), filters);
    }

    /**
     * Retrieve a sponsorship
     */
    sponsorship(filters) {
        Logger.debug('Client.sponsorship()', { filters });

        return this.#controllers
            .use('sponsorship')
            .getById(filters.id, EntityFactory.use('sponsorship'));
    }

    /**
     * Retrieve a specific sponsorship log from the organization
     */
    sponsorshipLog(filters) {
        Logger.debug('Client.sponsorshipLog()', { filters });

        return this.#controllers
            .use('sponsorshipLog')
            .getById(filters.id, EntityFactory.use('sponsorshipLog'));
    }

    /**
     * Retrieve sponsorships logs of the organization
     */
    sponsorshipLogs(filters = {}) {
        Logger.debug('Client.sponsorshipLogs()', { filters });

        return this.#controllers
            .use('sponsorshipLog')
            .getAll(EntityFactory.use('sponsorshipLog'), filters);
    }

    /**
     * Retrieve an user
     */
    user(filters) {
        Logger.debug('Client.user()', { filters });

        return this.#controllers
            .use('user')
            .getById(filters.id, EntityFactory.use('user'));
    }

    /**
     * Retrieve users
     */
    users(filters = {}) {
        Logger.debug('Client.users()', { filters });

        return this.#controllers
            .use('user')
            .getAll(EntityFactory.use('user'), filters);
    }
}
