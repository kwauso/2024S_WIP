import express from 'express';
import cors from 'cors';
import did_api from './routes/DID_API.js';
import { createDID } from './create-identifier.js';
import { agent } from './setup.js'
import fs from "fs";

const app: express.Express = express();

app.set("views", "./public/views");
app.set("view engine", "ejs");

app.use(cors());
app.use('/did', did_api);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req:express.Request, res:express.Response)=>{
    const cats = ["😺","😹","😻","😼","😸","😼","😽","🙀","😿","😾","🐱","🐈","🐾"]
    const random = Math.floor(Math.random()*13);
    const randomCat = cats[random]
    res.render("index", {cat:randomCat});
});

app.get("/createDID", (req:express.Request, res:express.Response)=>{
    const FLAG = 0;
    res.render("createDID", {name:"", flag:FLAG});
});

app.post("/createDID", (req:express.Request, res:express.Response)=>{
    let FLAG = 1;
    try {
        const name = req.body.name;
        createDID(`${name}`);
        console.log(name);
        res.render("createDID", {name:name, flag:FLAG});
    } catch (err){
        console.error(err);
    }
});

app.get("/createVC", (req:express.Request, res:express.Response)=>{
    const FLAG = 0;
    res.render("createVC", {name:"", flag:FLAG});
});

app.post("/createVC", (req:express.Request, res:express.Response)=>{
    const FLAG = 1;
    try {
        const alias = req.body.subject_name;
        const age = req.body.age;
        const gender = req.body.gender;
        console.log(alias, age, gender);

        const createVC = async(issuer_name:string, subject_name:string, age:number, gender:string)=>{

            const identifier = await agent.didManagerGetByAlias({ alias: `${issuer_name}` });
            const subject_identifier = await agent.didManagerGetByAlias({ alias: `${subject_name}` });
          
            const verifiableCredential = await agent.createVerifiableCredential({
              credential: {
                issuer: { id: identifier.did },
                credentialSubject: {
                  id: subject_identifier.did,
                  name: subject_name,
                  age: age,
                  gender: gender
                },
              },
              proofFormat: 'jwt',
            });
            try {
                fs.writeFileSync(`./src/vc/${alias}.txt`, `${JSON.stringify(verifiableCredential, null, 2)}`, 'utf8')
            } catch (err) {
                console.error(err)
            }
  
            console.log(JSON.stringify(verifiableCredential, null, 2));
        }

        createVC("otter", alias, age, gender);
        res.render("createVC", {name:alias, flag:FLAG});

    } catch(err){
        console.error(err);
    }
});

app.get("/downloadVC", (req:express.Request, res:express.Response)=>{
    const vcList = fs.readdirSync("src/vc");
    res.render("listVC", {vc:vcList});
});

app.get("/vc", (req:express.Request, res:express.Response)=>{
    const vcList = fs.readdirSync("src/vc");
    vcList.forEach((vc)=>{
        app.get(`/${vc}`, (req:express.Request, res:express.Response)=>{
            res.download(`./src/vc/${vc}`);
        });
    });
});

app.listen(3000,()=>{
    console.log('ポート3000番で起動しました')
});