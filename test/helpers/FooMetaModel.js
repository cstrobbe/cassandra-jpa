"use strict";
const MetaModel = require("../../lib/MetaModel");
const Foo = require("./Foo");
const Entity = require("../../lib/Entity");
module.exports = class FooMetaModel extends MetaModel {
    constructor(jpaConfig)
    {
        super(jpaConfig);
        this.name = "foo";
        this.fields = new Map([["id", "timeuuid"], ["name", "text"], ["created", "timeuuid"],
            ["entity", "text"], ["entities", "list<text>"], ["simpleObjects", "list<text>"],
            ["enabled", "boolean"], ["myMap", "map<text,text>"]]);
        this.partitionKeys = ["id"];
        this.clusteringColumns = new Map([["name", "ASC"]]);
        this.secondaryIndexes = ["name"];
        this.entityClass = Foo;
    }

    toRow(entity)
    {
        return super.toRow(entity);
    }

    fromRow(row)
    {
        let entity = super.fromRow(row);
        entity.entity = new Entity(JSON.parse(JSON.stringify(row.entity)));
        entity.entities = [];
        if (row.entities)
        {
            row.entities.forEach(function (element, index, array)
            {
                let e = new Entity(JSON.parse(JSON.stringify(element)));
                entity.entities.push(e);
            });
        }
        return entity;
    }
};