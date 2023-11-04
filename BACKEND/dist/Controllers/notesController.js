"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllNotes = exports.CreateNote = exports.TestingRoute = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const dbConfig_1 = require("../Configuration/dbConfig");
const validators_1 = require("../Validators/validators");
// CRUD
// CREATE
function TestingRoute(req, res) {
    return res.send("Server Running well");
}
exports.TestingRoute = TestingRoute;
const CreateNote = async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log(req.body);
        const { error } = validators_1.Notes.validate(req.body);
        if (error) {
            return res.status(422).json(error.message);
        }
        const noted_id = (0, uuid_1.v4)();
        // console.log(noted_id);
        const query_string = `INSERT INTO MyNotes (note_id, title,description) VALUES  ('${noted_id}','${title}' ,'${description}')`;
        //  try to connect to db 
        mssql_1.default.connect(dbConfig_1.sqlConfig).then(pool => {
            return pool.request().query(query_string);
        }).then(async (result) => {
            console.log(result);
            res.send("this is my responsw");
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.CreateNote = CreateNote;
const GetAllNotes = async (req, res) => {
    const queryAll = `SELECT * FROM myNotes`;
    mssql_1.default.connect(dbConfig_1.sqlConfig).then(pool => {
        return pool.request().query(queryAll);
    }).then(async (result) => {
        console.log(result);
        res.send(result.recordset);
    });
};
exports.GetAllNotes = GetAllNotes;
// READ 
