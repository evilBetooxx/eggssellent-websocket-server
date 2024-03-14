import { Module } from '@nestjs/common';
import { webSocketGateway } from './websocket.gateway';
import { MqttModule } from 'src/mqtt/mqtt.module';

@Module({
  imports: [MqttModule],
  providers: [webSocketGateway],
  exports: [],
})
export class webSocketModule {}
