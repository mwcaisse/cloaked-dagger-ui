import Vue from "vue"

import * as Constants from "@app/services/Constants.js"
import * as FriendlyConstants from "@app/services/FriendlyConstants.js"

//Register a global mixin to make constants be available as data in each vue component
Vue.mixin({
    data: function() {
        return {
            constants: Constants
        }
    }
});

Vue.filter("friendlyConstant", function (value, constantName) {
    const constantType = FriendlyConstants[constantName];

    if (constantType) {
        return constantType[value] || "";
    }
    return "";
});