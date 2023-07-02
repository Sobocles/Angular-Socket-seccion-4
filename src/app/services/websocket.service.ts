import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
public socketStatus = false; //servidor de socket esta con el estatus caido no esta funcionando
  constructor(private socket: Socket) {
    this.checkStatus();
   } //el constructor de un servicio solo se ejecuta una vez

  checkStatus(){
    //Estos son observables siempre van a estar pendiente d elo que sucesa con el connect y el disconnect
    this.socket.on('connect', () => {
      console.log('Conectando al servidor');
      this.socketStatus = true;
    })

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    })
  }

  emit( evento: string, payload?: any, callback?: Function ) {
    console.log('emitiendo evento');
    this.socket.emit( evento, payload, callback );
  }

  listen( evento: string ) {
    return this.socket.fromEvent( evento );
  }
}
