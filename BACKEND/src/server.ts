import express, { Request, Response,NextFunction, json } from 'express'
import { testConnection } from './Configuration/dbConfig';
import notes_route from './Routes/notesRoute';
import cors from 'cors'

const app=express()

app.use(cors())
app.use(json())
app.use('/note', notes_route)

app.use((error: Error, req:Request, res:Response, next:NextFunction)=>{
    res.json({
        message: error.message
    })
})

app.listen( 4000, ()=>{
    console.log("server is running");
    testConnection()
    
 })
