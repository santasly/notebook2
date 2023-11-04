import mssql from 'mssql'
import express, { Request, Response } from 'express'
import {v4} from 'uuid'
import { sqlConfig } from '../Configuration/dbConfig';
import { Notes } from '../Validators/validators';
// CRUD
// CREATE
export function TestingRoute(req:Request, res:Response){
    return res.send("Server Running well")
}
export const CreateNote = async (req:Request,res:Response)=>{
   
    try {
        const {title,description} = req.body;

        console.log(req.body);
        
        
                    const {error} = Notes.validate(req.body)
      

      if(error){
        return res.status(422).json(error.message)
      }
        const noted_id = v4();
    
        // console.log(noted_id);
    
    
         const query_string = `INSERT INTO MyNotes (note_id, title,description) VALUES  ('${noted_id}','${title}' ,'${description}')`
    
        //  try to connect to db 
         mssql.connect(sqlConfig).then(pool=>{
            return pool.request().query(query_string)
        }).then(async result => {
            console.log(result);
            
            res.send("this is my responsw")
            
        })
        
    } catch (error) {
        console.log(error);
        
    }
    
}
export const GetAllNotes = async(req:Request, res:Response)=>{
    const queryAll = `SELECT * FROM myNotes`

    mssql.connect(sqlConfig).then(pool=>{
        return pool.request().query(queryAll)
    }).then(async result => {
        console.log(result);
        
        res.send(result.recordset)
        
    })
}



// READ 