import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class webSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Cliente conectado:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client desnocectado:', client.id);
  }

  @SubscribeMessage('mensaje')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    console.log('Mensaje recibido:', data);
    client.broadcast.emit('mensajeserver', data);
  }
}
