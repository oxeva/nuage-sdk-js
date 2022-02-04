import CustomErrors from './index';

const customErrors = {
    network: CustomErrors.NuageNetworkError,
    429: CustomErrors.NuageRateLimitError,
    500: CustomErrors.NuageError,
};

export const contractCustomErrors = {
    ...customErrors,
    400: CustomErrors.ContractSyntaxError,
};

export const couponCustomErrors = {
    ...customErrors,
    400: CustomErrors.CouponSyntaxError,
    404: CustomErrors.CouponNotFound,
    422: CustomErrors.CouponUnprocessable,
};

export const customerCustomErrors = {
    ...customErrors,
    400: CustomErrors.CustomerSyntaxError,
    401: CustomErrors.CustomerAccessForbidden,
    403: CustomErrors.CustomerAccessForbidden,
    404: CustomErrors.CustomerNotFound,
    409: CustomErrors.CustomerUnprocessable,
    422: CustomErrors.CustomerUnprocessable,
};

export const flavorCustomErrors = {
    ...customErrors,
    400: CustomErrors.FlavorSyntaxError,
    401: CustomErrors.FlavorAccessForbidden,
    403: CustomErrors.FlavorAccessForbidden,
    404: CustomErrors.FlavorNotFound,
    422: CustomErrors.FlavorUnprocessable,
};

export const imageCustomErrors = {
    ...customErrors,
    400: CustomErrors.ImageSyntaxError,
    401: CustomErrors.ImageAccessForbidden,
    403: CustomErrors.ImageAccessForbidden,
    404: CustomErrors.ImageNotFound,
    422: CustomErrors.ImageUnprocessable,
};

export const invitationCustomErrors = {
    ...customErrors,
    400: CustomErrors.InvitationSyntaxError,
    401: CustomErrors.InvitationAccessForbidden,
    403: CustomErrors.InvitationAccessForbidden,
    404: CustomErrors.InvitationNotFound,
    422: CustomErrors.InvitationUnprocessable,
};
export const invoiceCustomErrors = {
    ...customErrors,
    400: CustomErrors.InvoiceSyntaxError,
    401: CustomErrors.InvoiceAccessForbidden,
    403: CustomErrors.InvoiceAccessForbidden,
    404: CustomErrors.InvoiceNotFound,
    422: CustomErrors.InvoiceUnprocessable,
};

export const ipCustomErrors = {
    ...customErrors,
    400: CustomErrors.IpSyntaxError,
    401: CustomErrors.IpAccessForbidden,
    403: CustomErrors.IpAccessForbidden,
    404: CustomErrors.IpNotFound,
    422: CustomErrors.IpUnprocessable,
    509: CustomErrors.NuageError,
};

export const itemCustomErrors = {
    ...customErrors,
    400: CustomErrors.ItemSyntaxError,
    401: CustomErrors.ItemAccessForbidden,
    403: CustomErrors.ItemAccessForbidden,
    404: CustomErrors.ItemNotFound,
    422: CustomErrors.ItemUnprocessable,
};

export const keypairCustomErrors = {
    ...customErrors,
    400: CustomErrors.KeypairSyntaxError,
    401: CustomErrors.KeypairAccessForbidden,
    403: CustomErrors.KeypairAccessForbidden,
    404: CustomErrors.KeypairNotFound,
    422: CustomErrors.KeypairUnprocessable,
};

export const metricCustomErrors = {
    ...customErrors,
    400: CustomErrors.MetricSyntaxError,
    401: CustomErrors.MetricAccessForbidden,
    422: CustomErrors.MetricUnprocessable,
};

export const newsletterCustomErrors = {
    ...customErrors,
    400: CustomErrors.NewsletterSyntaxError,
    404: CustomErrors.NewsletterNotFound,
    422: CustomErrors.NewsletterUnprocessable,
};

export const organizationCustomErrors = {
    ...customErrors,
    400: CustomErrors.OrganizationSyntaxError,
    401: CustomErrors.OrganizationAccessForbidden,
    403: CustomErrors.OrganizationAccessForbidden,
    404: CustomErrors.OrganizationNotFound,
    405: CustomErrors.OrganizationAccessForbidden,
    422: CustomErrors.OrganizationUnprocessable,
};

export const organizationLimitCustomErrors = {
    ...customErrors,
    400: CustomErrors.OrganizationLimitSyntaxError,
    401: CustomErrors.OrganizationLimitAccessForbidden,
    403: CustomErrors.OrganizationLimitAccessForbidden,
    404: CustomErrors.OrganizationLimitNotFound,
    422: CustomErrors.OrganizationLimitUnprocessable,
};

export const passwordCustomErrors = {
    ...customErrors,
    400: CustomErrors.PasswordSyntaxError,
    401: CustomErrors.PasswordAccessForbidden,
    404: CustomErrors.PasswordNotFound,
};

export const paymentMethodCustomErrors = {
    ...customErrors,
    400: CustomErrors.PaymentMethodSyntaxError,
    401: CustomErrors.PaymentMethodAccessForbidden,
    403: CustomErrors.PaymentMethodAccessForbidden,
    404: CustomErrors.PaymentMethodNotFound,
    422: CustomErrors.PaymentMethodUnprocessable,
};

export const productCustomErrors = {
    ...customErrors,
    400: CustomErrors.ProductSyntaxError,
    401: CustomErrors.ProductAccessForbidden,
    403: CustomErrors.ProductAccessForbidden,
    404: CustomErrors.ProductNotFound,
    422: CustomErrors.ProductUnprocessable,
};

export const productPriceCustomErrors = {
    ...customErrors,
    400: CustomErrors.ProductPriceSyntaxError,
    401: CustomErrors.ProductPriceAccessForbidden,
    403: CustomErrors.ProductPriceAccessForbidden,
    404: CustomErrors.ProductPriceNotFound,
    422: CustomErrors.ProductPriceUnprocessable,
};

export const projectCustomErrors = {
    ...customErrors,
    400: CustomErrors.ProjectSyntaxError,
    401: CustomErrors.ProjectAccessForbidden,
    403: CustomErrors.ProjectAccessForbidden,
    404: CustomErrors.ProjectNotFound,
    422: CustomErrors.ProjectUnprocessable,
};

export const projectLimitCustomErrors = {
    ...customErrors,
    400: CustomErrors.ProjectLimitSyntaxError,
    401: CustomErrors.ProjectLimitAccessForbidden,
    403: CustomErrors.ProjectLimitAccessForbidden,
    404: CustomErrors.ProjectLimitNotFound,
    422: CustomErrors.ProjectLimitUnprocessable,
};

export const projectUsageCustomErrors = {
    ...customErrors,
    400: CustomErrors.ProjectUsageSyntaxError,
    401: CustomErrors.ProjectUsageAccessForbidden,
    403: CustomErrors.ProjectUsageAccessForbidden,
    404: CustomErrors.ProjectUsageNotFound,
    422: CustomErrors.ProjectUsageUnprocessable,
};

export const roleCustomErrors = {
    ...customErrors,
    400: CustomErrors.RoleSyntaxError,
    401: CustomErrors.RoleAccessForbidden,
    403: CustomErrors.RoleAccessForbidden,
    404: CustomErrors.RoleNotFound,
    405: CustomErrors.RoleAccessForbidden,
    422: CustomErrors.RoleUnprocessable,
};

export const securityGroupCustomErrors = {
    ...customErrors,
    400: CustomErrors.SecurityGroupSyntaxError,
    401: CustomErrors.SecurityGroupAccessForbidden,
    403: CustomErrors.SecurityGroupAccessForbidden,
    404: CustomErrors.SecurityGroupNotFound,
    422: CustomErrors.SecurityGroupUnprocessable,
};

export const securityRuleCustomErrors = {
    ...customErrors,
    400: CustomErrors.SecurityRuleSyntaxError,
    401: CustomErrors.SecurityRuleAccessForbidden,
    403: CustomErrors.SecurityRuleAccessForbidden,
    404: CustomErrors.SecurityRuleNotFound,
    422: CustomErrors.SecurityRuleUnprocessable,
};

export const serverCustomErrors = {
    ...customErrors,
    400: CustomErrors.ServerSyntaxError,
    401: CustomErrors.ServerAccessForbidden,
    403: CustomErrors.ServerAccessForbidden,
    404: CustomErrors.ServerNotFound,
    422: CustomErrors.ServerUnprocessable,
    509: CustomErrors.NuageError,
};

export const sponsorshipCustomErrors = {
    ...customErrors,
    400: CustomErrors.SponsorshipSyntaxError,
    401: CustomErrors.SponsorshipAccessForbidden,
    404: CustomErrors.SponsorshipNotFound,
    422: CustomErrors.SponsorshipUnprocessable,
};

export const sponsorshipLogCustomErrors = {
    ...customErrors,
    400: CustomErrors.SponsorshipLogSyntaxError,
    401: CustomErrors.SponsorshipLogAccessForbidden,
    404: CustomErrors.SponsorshipLogNotFound,
    422: CustomErrors.SponsorshipLogUnprocessable,
};

export const userCustomErrors = {
    ...customErrors,
    400: CustomErrors.UserSyntaxError,
    401: CustomErrors.UserAccessForbidden,
    403: CustomErrors.UserAccessForbidden,
    404: CustomErrors.UserNotFound,
    405: CustomErrors.UserNotFound,
    422: CustomErrors.UserUnprocessable,
};
