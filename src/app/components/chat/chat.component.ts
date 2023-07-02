import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  mensajesSubscription!: Subscription;
  elemento!: HTMLElement;

  mensajes: any[] = [];

  constructor(public ChatService: ChatService){}

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes') as HTMLElement;
  
    if (this.elemento) {
      // El elemento existe, se puede asignar sin problemas
      this.mensajesSubscription = this.ChatService.getMessages().subscribe(msg => {
        console.log(msg);
        this.mensajes.push(msg);
  
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        });
      });
    }
  }
  

  ngOnDestroy(): void {
      this.mensajesSubscription.unsubscribe();
  }

  enviar(){
    
    if ( this.texto.trim().length === 0 ) {
      return;
    }
    this.ChatService.sendMessage(this.texto);
    this.texto = '';
  }
}
