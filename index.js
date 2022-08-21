"use strict"
const {DataTypes} = require("sequelize");
const {hooks, getDiff, defineModel} = require("./lib/Helpers");
const {isEmpty} = require('lodash')

exports.init = (sequelize) => {
    return {
        enableAndLoadModelTrail: function enableAndLoadModelTrail(db) {
            const Revision = defineModel(sequelize, DataTypes)
            db.revisions = Revision
            Object.keys(db).forEach((modelName) => {
                if (modelName !== "revisions"){
                    db[modelName].hasMany(db['revisions'], {
                        constraints: false,
                        foreignKey: "documentId",
                        scope: {model: modelName.toLowerCase()}
                    })

                    db['revisions'].belongsTo(db[modelName],{
                        constraints: false,
                        foreignKey: "documentId"
                    })

                    hooks.forEach((hook) => {
                        db[modelName].addHook(hook.name, (instance, options) => {
                            try{
                                const document = getDiff(instance._changed, instance.dataValues, instance._previousDataValues, hook.name)

                                if (!isEmpty(document) || hook.name === "afterDestroy"){
                                    instance.createRevision({
                                        document: document,
                                        userId: options.userId,
                                        operation: hook.event
                                    })
                                }
                            }
                            catch (e) {
                                console.log("Error on Creating Revisions", e)
                            }
                        })
                    })

                    if (db[modelName].associate){
                        db[modelName].associate(db)
                    }
                }
            })
            return Revision
        },
    };
};

module.exports = exports;