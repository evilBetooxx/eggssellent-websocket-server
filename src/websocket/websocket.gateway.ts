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
import { MqttService } from '../mqtt/mqtt.service';

@WebSocketGateway()
export class webSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly mqttService: MqttService) {}

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

  suscribirHuevo(
    @ConnectedSocket() client: Socket,
    @MessageBody() huevoId: string,
  ) {
    console.log('Suscrito al huevo:', huevoId);
    client.join(huevoId); // Unir al cliente al canal del huevo
    // Suscribir al topic MQTT correspondiente al huevo
    this.mqttService.subscribeToHuevo(huevoId, (topic, message) => {
      // Enviar los datos del huevo al cliente
      client.emit('datosHuevo', { huevoId, data: message.toString() });
    });
  }

  unsubscribeHuevo(
    @ConnectedSocket() client: Socket,
    @MessageBody() huevoId: string,
  ) {
    console.log('Desuscrito del huevo:', huevoId);
    client.leave(huevoId); // Salir del canal del huevo
    // Desuscribir del topic MQTT correspondiente al huevo
    this.mqttService.unsubscribeFromHuevo(huevoId);
  }
}
