import * as WebSocket from "ws";

export class Websocket {
    private static instance: Websocket;
    private static wss: WebSocket.Server;


// single Singleton
    private constructor() {
        this.startWs();
    }

    public static getInstance(): Websocket {
        if (!Websocket.instance) {
            Websocket.instance = new Websocket();
        }

        return Websocket.instance;
    }

    private startWs() {
        Websocket.wss = new WebSocket.Server({port: 3000});
        Websocket.wss.on('connection', ws => {
            ws.on('message', message => console.log('received: %s', message));
            ws.send('Welcome!');
        })
    }

    public broadcast(data: String) {
        Websocket.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) client.send(data)
        });
    }

}
