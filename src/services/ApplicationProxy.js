import Proxy from "@app/services/Proxy.js"

const defaultBaseUrl = "/api/";

class UserService {

    constructor(baseUrl = defaultBaseUrl) {
        this.proxy = new Proxy(baseUrl);
    }

    login(username, password) {
        let data = {
            username: username,
            password: password
        };
        return this.proxy.post("user/login", data);
    }

    logout() {
        return this.proxy.post("user/logout");
    }

    register(registration) {
        return this.proxy.post("user/register", registration);
    }

    me() {
        return this.proxy.get("user/me");
    }
}

class ResourceService {

    constructor(baseUrl = defaultBaseUrl) {
        this.proxy = new Proxy(baseUrl);
    }

    get(id) {
        return this.proxy.get(`resource/${id}`);
    }

    getAll() {
        return this.proxy.get("resource");
    }

    create(resource) {
        return this.proxy.post("resource", resource);
    }

    update(id, resource) {
        return this.proxy.put(`resource/${id}`, resource);
    }

    delete(id) {
        return this.proxy.delete(`resource/${id}`);
    }
}

class ResourceScopeService {

    constructor(baseUrl = defaultBaseUrl) {
        this.proxy = new Proxy(baseUrl);
    }

    getForResource(resourceId) {
        return this.proxy.get(`resource/${resourceId}/scope`);
    }

    get(resourceId, id) {
        return this.proxy.get(`resource/${resourceId}/scope/${id}`);
    }

    create(resourceId, scope) {
        return this.proxy.post(`resource/${resourceId}/scope`, scope);
    }

    remove(resourceId, id) {
        return this.proxy.delete(`resource/${resourceId}/scope/${id}`)
    }

}

class ClientService {

    constructor(baseUrl = defaultBaseUrl) {
        this.proxy = new Proxy(baseUrl);
    }

    get(id) {
        return this.proxy.get(`client/${id}`);
    }

    getAll() {
        return this.proxy.get("client");
    }

    create(client) {
        return this.proxy.post("client", client);
    }

    update(id, client) {
        return this.proxy.put(`client/${id}`, client);
    }

    delete(id) {
        return this.proxy.delete(`client/${id}`);
    }
};

class ClientUriService {

    constructor(baseUrl = defaultBaseUrl) {
        this.proxy = new Proxy(baseUrl);
    }

    getForClient(clientId) {
        return this.proxy.get(`client/${clientId}/uri/`);
    }

    create(clientId, uri) {
        return this.proxy.post(`client/${clientId}/uri/`, uri);
    }

    update(clientId, id, uri) {
        return this.proxy.put(`client/${clientId}/uri/${id}`, uri);
    }

    delete(clientId, id) {
        return this.proxy.delete(`client/${clientId}/uri/${id}`);
    }
};

class ClientAllowedGrantTypeService {

    constructor(baseUrl = defaultBaseUrl) {
        this.proxy = new Proxy(baseUrl);
    }

    add(clientId, grantTypeId) {
        return this.proxy.post(`client/${clientId}/allowed-grant-type/${grantTypeId}`);
    };

    remove(clientId, grantTypeId) {
        return this.proxy.delete(`client/${clientId}/allowed-grant-type/${grantTypeId}`);
    };
}

class ClientAllowedIdentityService {

    constructor(baseUrl = defaultBaseUrl) {
        this.proxy = new Proxy(baseUrl);
    }

    add(clientId, identityId) {
        return this.proxy.post(`client/${clientId}/allowed-identity/${identityId}`);
    }

    remove(clientId, identityId) {
        return this.proxy.delete(`client/${clientId}/allowed-identity/${identityId}`);
    }
}

class ClientAllowedScopeService {

    constructor(baseUrl = defaultBaseUrl) {
        this.proxy = new Proxy(baseUrl);
    }

    add(clientId, scopeName) {
        return this.proxy.post(`client/${clientId}/allowed-scope/${scopeName}`);
    }

    remove(clientId, scopeName) {
        return this.delete.post(`client/${clientId}/allowed-scope/${scopeName}`);
    }

}

class ScopeService {

    constructor(baseUrl = defaultBaseUrl) {
        this.proxy = new Proxy(baseUrl);
    }

    search(text) {
        return this.proxy.get(`/scope/search?text=${text}`);
    }
}

export {
    UserService,
    ResourceService,
    ResourceScopeService,
    ClientService,
    ClientUriService,
    ClientAllowedGrantTypeService,
    ClientAllowedIdentityService,
    ClientAllowedScopeService,
    ScopeService

}