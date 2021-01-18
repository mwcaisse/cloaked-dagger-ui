export default class User {

    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.name = user.name;
        this.roles = user.roles;
    }

    hasRole(role) {
        return this.roles.includes(role);
    }
}