import * as Constants from "@app/services/Constants.js"

const CLIENT_GRANT_TYPE = {
    [Constants.CLIENT_GRANT_TYPE.AUTHORIZATION_CODE]: "Authorization Code",
    [Constants.CLIENT_GRANT_TYPE.CLIENT_CREDENTIALS]: "Client Credentials"
};

const CLIENT_GRANT_TYPE_DESCRIPTION = {
    [Constants.CLIENT_GRANT_TYPE.AUTHORIZATION_CODE]: "Allows the application to request a token on behalf of a user via a login flow.",
    [Constants.CLIENT_GRANT_TYPE.CLIENT_CREDENTIALS]: "Allows the application to request client credentials for app to app communication."
};

const CLIENT_URI_TYPE = {
    [Constants.CLIENT_URI_TYPE.REDIRECT]: "Redirect",
    [Constants.CLIENT_URI_TYPE.POST_LOGOUT_REDIRECT]: "Post Logout Redirect"
};

const IDENTITY = {
    [Constants.IDENTITY.OPEN_ID]: "OpenID",
    [Constants.IDENTITY.PROFILE]: "Profile",
    [Constants.IDENTITY.EMAIL]: "Email",
    [Constants.IDENTITY.USER]: "User"
};

export {
    CLIENT_GRANT_TYPE,
    CLIENT_GRANT_TYPE_DESCRIPTION,
    CLIENT_URI_TYPE,
    IDENTITY
};