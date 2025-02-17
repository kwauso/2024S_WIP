import express from 'express';
import { agent } from '../setup.js';
const router = express.Router();
router.get("/", (req, res) => {
    res.render("listDID");
});
async function listDID() {
    const identifiers = await agent.didManagerFind();
    identifiers.map((id) => {
        router.get(`/did/${id["alias"]}`, (req, res) => {
            res.json(id);
        });
    });
}
listDID();
export default router;
