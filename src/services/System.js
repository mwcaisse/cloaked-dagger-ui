import Vue from "vue"

class System {
    constructor() {
        this._events = new Vue();
    }

    get events() {
        return this._events;
    }
}

export default new System();
