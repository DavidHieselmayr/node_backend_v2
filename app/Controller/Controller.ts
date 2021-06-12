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
            res.send('Rest Servie - USERS')
        });

        router.get('/init', async function (req, res) {
            console.log('init')
            try {
                await repo.initDB();
                res.send("init ok");
            } catch (error) {
                console.log("initDB error");
                res.send("init error");
            }
        });

        router.get('/teacher/findAll', async (req, res) => {
            try {
                let data = await repo.findAllTeachers();
                res.send(data);
            } catch (ex) {
                console.log('error loc: /teacher/findAll\n'+ex)
            }
        });


        router.get('/class/findAll', async (req, res) => {
            try {
                let data = await repo.findAllSchoolClasses();
                res.send(data);
            } catch (ex) {
                console.log('error loc: /class/findAll\n'+ex);
            }
        });


        router.get('/unit/findunitfromclassbyclassid/:classid', async (req, res) => {
            try {
                let data = await repo.findUnitFromClassByClassid(req.params.classid);
                res.send(data);
            } catch (ex) {
                console.log('error loc: /unit/findclassbyclassid/:classid\n'+ex);
            }

        })

        router.get('/ws/:name', (req, res) => {
            ws.broadcast(req.params.name);
        })

        return router;
    }
}
