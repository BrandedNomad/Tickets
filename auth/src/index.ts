import express from 'express';
import {json} from 'body-parser'

const app = express();
app.use(json());

const port: number = 3001 || process.env.PORT

app.listen(3000, ()=>{
    console.log("Server is up and running on port: " + port)
})
