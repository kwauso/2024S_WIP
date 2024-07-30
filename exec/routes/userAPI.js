import express from 'express';
import { agent } from '../setup.js';
const router = express.Router();
const json_1 = [{ id: 1, name: "taro" }, { id: 2, name: 2 }, { id: 99, name: "hello" }];
const json_2 = [{ number: 123 }, { number: 456 }];
const how_many_api = 3;
router.get("/", (req, res) => {
    res.send("This API page. Here is API index below.");
});
router.get("/api1/aaa", (req, res) => {
    res.json(json_1);
});
router.get("/api2", (req, res) => {
    res.json(json_2);
});
async function listDID() {
    const identifiers = await agent.didManagerFind();
    identifiers.map((id) => {
        router.get(`/${id["alias"]}`, (req, res) => {
            res.json(id);
        });
    });
}
listDID();
export default router;
