"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notesController_1 = require("../Controllers/notesController");
const notes_route = (0, express_1.Router)();
notes_route.get('/', notesController_1.TestingRoute);
notes_route.post('/create', notesController_1.CreateNote);
notes_route.get('/getAllnote', notesController_1.GetAllNotes);
exports.default = notes_route;
