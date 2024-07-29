import express from 'express';
const router = express.Router();

const json_1 = [{id:1, name:"taro"}, {id:2, name:2}, {id:99, name:"hello"}]
const json_2 = [{number:123}, {number:456}]
const how_many_api: number = 3;

router.get("/", (req:express.Request, res:express.Response)=>{
    res.send("This API page. Here is API index below.");
});

router.get("/api1", (req:express.Request, res:express.Response)=>{
    res.json(json_1);
});

router.get("/api2", (req:express.Request, res:express.Response)=>{
    res.json(json_2);
});

for (let i = 0; i<6; i++){
    const res_json = [{number: i}, {number: i**i}, {number: i**i**i}];
    router.get(`/api${i}`, (req:express.Request, res:express.Response)=>{
        res.json(res_json);
    });
}

export default router
