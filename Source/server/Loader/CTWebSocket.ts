// // import WebSocket from 'ws';
// import WebSocket from 'ws';
// import { IClientWebSocket } from '../../client/assets/Scripts/Core/Network/IWebSocket';

// export class CTClientWebSocket extends IClientWebSocket {
//     ws: WebSocket

//     init(url: string) {
//         this.ws = new WebSocket(url)
//     }

//     initWithWs(ws: any) {
//         this.ws = ws
//     }

//     /**
//      * 客户端连接服务端成功
//      * @param cb 
//      */
//     onOpen(cb: Function) {
//         this.ws.on("open", (ws: WebSocket) => {
//             cb()
//         })
//     }


//     onMessage(cb: Function) {
//         this.ws.on("message", (stream: string) => {
//             cb(stream)
//         })
//     }

//     close() {
//         this.ws.close()
//         this.ws = null
//     }
// }

// export class CTServerWebSocket {
//     ws: WebSocket.Server

//     constructor() {

//     }

//     init(host: string, port: number) {
//         this.ws = new WebSocket.Server({ host: host, port: port })
//     }

//     /**
//      * 有客户端连接
//      * @param event 
//      */
//     onConnection(cb: Function) {
//         this.ws.on("connection", (socket: WebSocket) => {
//             let ws = new CTClientWebSocket()
//             ws.initWithWs(socket)
//             cb(ws)
//         })
//     }

//     close() {
//         this.ws.close()
//         this.ws = null
//     }
// }

export {}