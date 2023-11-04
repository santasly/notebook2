"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mssql_1 = __importDefault(require("mssql"));
const dbConfig_1 = require("../Configuration/dbConfig");
class Connection {
    constructor() {
        this.pool = this.getConnection();
    }
    async getConnection() {
        const pool = mssql_1.default.connect(dbConfig_1.sqlConfig);
        return pool;
    }
    createRequest(request, data) {
        const keys = Object.keys(data);
        keys.map((keyName) => {
            const keyValue = data[keyName];
            request.input(keyName, keyValue);
        });
        return request;
    }
    async query(query) {
        const results = (await this.pool).request().query(query);
        return results;
    }
    async execute(procedureName, data = {}) {
        let pool = await this.pool;
        let request = (await pool.request());
        request = this.createRequest(request, data);
        const result = await request.execute(procedureName);
        return result;
    }
}
exports.default = Connection;
