import { Injectable } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService {
  private client: mqtt.MqttClient;

  constructor() {
    this.client = mqtt.connect('mqtt://localhost:1883'); // URL Del broker MQTT
    this.client.on('connect', () => {
      console.log('Conectado al broker MQTT');
    });
  }

  public subscribeToHuevo(
    huevoId: string,
    callback: (topic: string, message: Buffer) => void,
  ) {
    this.client.subscribe(`huevo/${huevoId}`);
    this.client.on('message', callback);
  }

  public unsubscribeFromHuevo(huevoId: string) {
    this.client.unsubscribe(`huevo/${huevoId}`);
  }
}
