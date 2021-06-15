import {Router, Request, Response, RequestHandler, response} from "express";
import {Repository} from '../Repository/Repository';
import {Websocket} from "../WebSocket/websocket";

export class Controller {
    // @ts-ignore
    static handler(): RequestHandler {
        const repo = new Repository();
        let router: Router = Router();
        let ws: Websocket = Websocket.getInstance();

        router.get('/message', function (req, res) {
            // res.header("Access-Control-Allow-Origin", "*");
            res.send('Rest Servie - USERS')
        });

        router.get('/init', async function (req, res) {
            console.log('init')
            try {
                await repo.initDB();
                // res.header("Access-Control-Allow-Origin", "*");
                res.send("init ok");
            } catch (error) {
                console.log("initDB error");
                // res.header("Access-Control-Allow-Origin", "*");
                res.send("init error");
            }
        });

        router.get('/teacher/findAll', async (req, res) => {
            try {
                let data = await repo.findAllTeachers();
                res.header("Access-Control-Allow-Origin", "*");
                res.send(data);
            } catch (ex) {
                console.log('error loc: /teacher/findAll\n' + ex)
            }
        });


        router.get('/class/findAll', async (req, res) => {
            try {
                let data = await repo.findAllSchoolClasses();
                res.header("Access-Control-Allow-Origin", "*");
                res.send(data);
            } catch (ex) {
                console.log('error loc: /class/findAll\n' + ex);
            }
        });


        router.get('/unit/findunitfromclassbyclassid/:classid', async (req, res) => {
            try {
                let data = await repo.findUnitFromClassByClassid(req.params.classid);
                res.header("Access-Control-Allow-Origin", "*");
                res.send(data);
            } catch (ex) {
                console.log('error loc: /unit/findclassbyclassid/:classid\n' + ex);
            }

        })
        router.put('/unit/save', async (req, res) => {
            try {
                console.log("bin im put")
                console.log(req.body)

                //let data = await repo.saveUnit(req.body)

                for (const unitElement of req.body) {
                    console.log(unitElement);
                    await repo.saveUnit(unitElement);
                }
                res.sendStatus(204);
            } catch (error) {
                console.log("saving error");
                res.send("saving error");
            }
        })

        router.get('/ws/:name', (req, res) => {
            ws.broadcast(req.params.name);
        })

        return router;
    }
}
