import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService: WebsocketService) { }

  sendMessage( mensaje: string ) {
    const payload = {
      de: 'Fernando',
      cuerpo: mensaje //aca se guarda el mensaje que viene desde el app.component (Hola desde angular)
    }
    this.wsService.emit('mensaje', payload) //emit ES EL METODO QUE ENVIA LA COMUNICACION HACIA EL SERVIDOR (que esta en el servicio websocketservice)
  };

  getMessages() {
    return this.wsService.listen('mensaje-nuevo'); //estoy escuchando cualquier emision del servidor llamada nuevo mensaje
  }

  

}
