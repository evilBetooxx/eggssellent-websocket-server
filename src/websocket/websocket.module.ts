import { Module } from '@nestjs/common';
import { webSocketGateway } from './websocket.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [webSocketGateway],
  exports: [],
})
export class webSocketModule {}
