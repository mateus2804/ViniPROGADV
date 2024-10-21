import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MessageComponentSignal } from './message-signal.component';
import { Message } from './message.model';
import { MessageService } from './message.services';

@Component({
  selector: 'app-message-list',
  standalone: true,
  imports: [FormsModule, MessageComponentSignal],
  template: `
    <div class="col-md-8 col-md-offset-2">
      @for (msg of messageS; track $index) {
        <app-message-signal [messageVarClasse]="msg" (outputMessage)="msg.content = $event"></app-message-signal>
      } @empty {
        messages é uma lista vazia
      }
    </div>
  `,
})
export class MessageListComponent implements OnInit {

  messageS: Message[] = [
    new Message("Texto 01 da Mensagem - LIST-Comp", "ViniciusRosalen"),
    new Message("Texto 02 da Mensagem - LIST-Comp", "RosalenSilva"),
    new Message("Texto 03 da Mensagem - LIST-Comp", "SilvaVinicius"),
  ];

  constructor (private messageService: MessageService){}

  ngOnInit(): void {
    this.messageS = this.messageService.getMessages();
  }
}