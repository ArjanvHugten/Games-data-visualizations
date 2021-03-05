export const PrepareDataOneDeep = function (data, keyAttribute, valueAttribute = "", filter = []){
    var dictonary = {};

    data.forEach((d) => {
        let key1 = d[keyAttribute];
        let value = d[valueAttribute];

        if (filter.indexOf(key1) !== -1) {
            return;
        }

        if (!dictonary[key1]) {
            dictonary[key1] = 0;
        }

        dictonary[key1] += valueAttribute ? (parseFloat(value) || 0) : 1;
    });

    return dictonary;
}

export const PrepareDataTwoDeep = function (data, keyAttribute, keyAttribute2, valueAttribute = "", filter = []){
    var dictonary = {};

    data.forEach((d) => {
        let key1 = d[keyAttribute];
        let key2 = d[keyAttribute2];
        let value = d[valueAttribute];

        if (filter.indexOf(key1) !== -1 || filter.indexOf(key2) !== -1) {
            return;
        }

        if (!dictonary[key1]) {
            dictonary[key1] = {};
        }
        
        if (!dictonary[key1][key2]) {
            dictonary[key1][key2] = 0;
        }

        dictonary[key1][key2] += valueAttribute ? (parseFloat(value) || 0) : 1;
    });

    return dictonary;
}