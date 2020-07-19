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

    register(registration) {
        return this.proxy.post("user/register", registration);
    }
}

export {
    UserService
}