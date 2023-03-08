export interface IWebSocketServer{
    on(...any)
}

export interface IWebSocket{
    on(...any)
    send(...any)
    onmessage(...any)
    onopen(...any)
    close(...any)
}

// let ws = new WebSocket('')

// ws.onmessage
// ws.onopen
// ws.onclose