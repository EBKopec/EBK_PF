export const checkArray = (array) => {
    if (typeof array !== undefined && array.length > 0) {
        return array
    } else {
        console.log(array);
        throw "Array invalid or empty";
    }
};
