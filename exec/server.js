import express from 'express';
import cors from 'cors';
import api from './routes/userAPI.js';
import { createDID } from './create-identifier.js';
import { createVC } from './create-credential.js';
const app = express();
app.set("views", "./public/views");
app.set("view engine", "ejs");
//app.use(express.static('/home/akira/2024S_WIP/public'));
app.use(cors());
app.use('/username', api);
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    const cats = ["😺", "😹", "😻", "😼", "😸", "😼", "😽", "🙀", "😿", "😾", "🐱", "🐈", "🐾"];
    const random = Math.floor(Math.random() * 13);
    const randomCat = cats[random];
    res.render("index", { cat: randomCat });
});
app.get("/createDID", (req, res) => {
    const FLAG = 0;
    res.render("createDID", { name: "", flag: FLAG });
});
app.post("/createDID", (req, res) => {
    let FLAG = 1;
    try {
        const name = req.body.name;
        createDID(`${name}`);
        console.log(name);
        res.render("createDID", { name: name, flag: FLAG });
    }
    catch (err) {
        console.error(err);
    }
});
app.get("/createVC", (req, res) => {
    const FLAG = 0;
    res.render("createVC", { name: "", flag: FLAG });
});
app.post("/createVC", (req, res) => {
    const FLAG = 1;
    try {
        const alias = req.body.name;
        const age = req.body.age;
        const gender = req.body.gender;
        console.log(alias, age, gender);
        createVC(alias, age, gender);
        res.render("createVC", { name: alias, flag: FLAG });
    }
    catch (err) {
        console.error(err);
    }
});
app.listen(3000, () => {
    console.log('ポート3000番で起動しました');
});
