
const CLIENT_GRANT_TYPE = {
    AUTHORIZATION_CODE: 1,
    CLIENT_CREDENTIALS: 2
};

const CLIENT_GRANT_TYPES = [
    CLIENT_GRANT_TYPE.AUTHORIZATION_CODE,
    CLIENT_GRANT_TYPE.CLIENT_CREDENTIALS
];

const CLIENT_URI_TYPE = {
    REDIRECT: 1,
    POST_LOGOUT_REDIRECT: 2
};

const CLIENT_URI_TYPES = [
    CLIENT_URI_TYPE.REDIRECT,
    CLIENT_URI_TYPE.POST_LOGOUT_REDIRECT
];

const IDENTITY = {
    OPEN_ID: 1,
    PROFILE: 2,
    EMAIL: 3,
    USER: 4
};

const IDENTITIES = [
    IDENTITY.OPEN_ID,
    IDENTITY.PROFILE,
    IDENTITY.EMAIL,
    IDENTITY.USER
];

export {
    CLIENT_GRANT_TYPE,
    CLIENT_GRANT_TYPES,

    CLIENT_URI_TYPE,
    CLIENT_URI_TYPES,

    IDENTITY,
    IDENTITIES
}