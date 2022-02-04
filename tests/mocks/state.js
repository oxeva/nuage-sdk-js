import VARS from '../variables';

const { values: VALUES } = VARS;

export const state = {
    coupon: VALUES.coupon,
    sponsorCode: VALUES.sponsorCode,
};

export const setState = (key, value) => {
    state[key] = value;
};
