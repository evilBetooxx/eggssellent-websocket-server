import { Module } from '@nestjs/common';
import { webSocketModule } from './websocket/websocket.module';

@Module({
  imports: [webSocketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
