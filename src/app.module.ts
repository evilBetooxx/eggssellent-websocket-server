import { Module } from '@nestjs/common';
import { webSocketModule } from './websocket/websocket.module';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [webSocketModule, MqttModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
