import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, input, Input, Output, EventEmitter } from '@angular/core';
import { Message } from './message.model';

@Component({
  selector: 'app-message-signal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './message-signal.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponentSignal {
  
    color = 'yellow';
    // @Input() messageVarClasse : Message = new Message("", "");
    messageVarClasse = input<Message>(new Message("", ""));

    @Output() outputMessage = new EventEmitter<string>();

    onEdit(){
        this.outputMessage.emit("Texto retornado componente com signal: venho de message(child) para o app(pai)");
    }
}