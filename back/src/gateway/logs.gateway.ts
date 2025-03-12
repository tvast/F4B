import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', // React dev server origin
    methods: ['GET', 'POST'],
  },
})
export class LogsGateway {
  @WebSocketServer()
  server: Server;

  sendLog(message: string): void {
    this.server.emit('logs', { message });
  }
}
