const { isEqual } = require('lodash')

/**
 * Hooks
 **/
const hooks = [
    {name: "afterCreate", event: "create"},
    {name: "afterUpdate", event: "update"},
    {name: "afterDestroy", event: "destroy"}
];

/**
 * get difference between objects
 **/
const getDiff = (changedKeys, object1, object2, hookName) => {

    const finalKeys = Array.from(changedKeys);
    const diffObj = {}
    if (hookName === "afterDestroy") return diffObj
    finalKeys.forEach((key) => {
        if (!isEqual(object1[key], object2[key]))
            diffObj[key] = [object1[key], object2[key]]
    })

    return diffObj
}

const tableAttributes =  (DataType) => {

    return {
        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        model: {
            type: DataType.STRING,
            allowNull: false
        },
        document: {
            type: DataType.TEXT,
            allowNull: true
        },
        operation: {
            type: DataType.STRING,
            allowNull: false
        },
        userId: {
            type: DataType.INTEGER,
            allowNull: true
        },
    }
}

const defineModel = (sequelize, DataTypes) => {
    return sequelize.define('revisions', tableAttributes(DataTypes));
}

module.exports = {
    hooks,
    getDiff,
    defineModel,
    tableAttributes
}