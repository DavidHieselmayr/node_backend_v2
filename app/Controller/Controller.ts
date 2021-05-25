import {Router, Request, Response, RequestHandler} from "express";
import {Repository} from '../Repository/Repository';

export class Controller {
    // @ts-ignore
    static handler(): RequestHandler {
        const repo = new Repository();
        let router: Router = Router();

        router.get('/message', function (req, res) {
            res.send('Rest Servie - USERS')
        });

        router.get('/init', async function (req, res) {
            try {
                await repo.initDB();
                res.send("init ok");
            } catch (error) {
                console.log("initDB error");
                res.send("init error");
            }
        });

        router.get('/teacher/findAll', async (req, res) => {
            let data = await repo.findAllTeachers();
            res.send(data);
        });

        // findUnitBySchoolclass

        router.get('/schoolclass/findUnitBySchoolclass', async (req,res)=>{
            let data = await repo.findUnitBySchoolclass("d");
            res.send(data);
        })

        return router;
    }
}
