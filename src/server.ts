import express from 'express';
import cors from 'cors';
import api from './routes/userAPI.js';
import { createDID } from './create-identifier.js';

const app: express.Express = express();

app.set("views", "./public/views");
app.set("view engine", "ejs");

app.use(express.static('/home/akira/2024S_WIP/public'));
app.use(cors());
app.use('/api', api);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req:express.Request, res:express.Response)=>{
    res.send();
});

app.get("/createDID", (req:express.Request, res:express.Response)=>{
    const FLAG = 0;
    res.render("createDID", {name:"yaro", flag:FLAG});
});

app.post("/createDID", (req:express.Request, res:express.Response)=>{
    const FLAG = 1;
    const test = "test";
    try {
        const name = req.body.name;
        console.log(name);
    } catch (err){
        console.error(err);
    }
    //createDID(`${test}`);
    res.render("createDID", {name:"yaro", flag:FLAG});
});

app.get("/createVC", (req:express.Request, res:express.Response)=>{
    const FLAG = 1;
    res.render("createVC", {name:"yaro", flag:FLAG});
});

app.listen(3000,()=>{
    console.log('ポート3000番で起動しました')
});
