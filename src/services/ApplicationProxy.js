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
}

export {
    UserService,
    ResourceService,
    ResourceScopeService,
    ClientService
}