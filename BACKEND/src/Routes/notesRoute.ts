import { Router } from "express";

import { CreateNote, GetAllNotes ,TestingRoute} from "../Controllers/notesController";


const notes_route = Router();

notes_route.get('/', TestingRoute)
notes_route.post('/create',CreateNote)
notes_route.get('/getAllnote',GetAllNotes)

export default notes_route