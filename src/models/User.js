export default class User {

    constructor(user) {
        this.id = user.id;
        this.username = user.username;
        this.name = user.name;
        this.roles = user.roles;
        this.additionalActions = user.additionalActions;
    }

    hasRole(role) {
        return this.roles.includes(role);
    }
}
