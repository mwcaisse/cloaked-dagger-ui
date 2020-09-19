
class Arrays {

    static remove(array, element) {
        let ind = array.indexOf(element);
        if (ind >= 0) {
            array.splice(ind, 1);
        }
    }
}

export {
    Arrays
}