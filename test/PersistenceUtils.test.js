"use strict";
let assert = require("assert");
let cassandra = require('cassandra-driver');
let m = require("..");
describe("cassandra-persistence", function ()
{
    describe("#PersistenceUtils", function ()
    {
        describe("#toTimeUuid", function ()
        {
            let id;
            before(function ()
            {
                id = cassandra.types.TimeUuid.now();
                assert(id instanceof cassandra.types.TimeUuid);
            });
            it("should convert from TimeUuid", function ()
            {
                assert(m.PersistenceUtils.toTimeUuid(id) instanceof cassandra.types.TimeUuid);
            });
            it("should convert from String of valid TimeUuid format", function ()
            {
                let idString = id.toString();
                assert(typeof idString === "string");
                assert(m.PersistenceUtils.toTimeUuid(idString) instanceof cassandra.types.TimeUuid);
            });
            it("should convert from Date", function ()
            {
                let idDate = new Date("12", "12", "12");
                assert(typeof idDate === "object" && idDate instanceof Date);
                assert(m.PersistenceUtils.toTimeUuid(idDate) instanceof cassandra.types.TimeUuid);
            });
            it("should throw RangeError when invalid String", function ()
            {
                let idString = "test";
                assert.throws(() =>
                {
                    m.PersistenceUtils.toTimeUuid(idString)
                }, RangeError);
            });
            it("should throw RangeError when invalid object", function ()
            {
                let isNothingO = {};
                assert.throws(() =>
                {
                    m.PersistenceUtils.toTimeUuid(isNothingO)
                }, RangeError);
            });
        });
    });
});