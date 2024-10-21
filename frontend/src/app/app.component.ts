import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Message } from './messages/message.model';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  valorNgSwitch: number = 0;

  mostrarElemento: boolean = true;
  onMudaMostrarElemento(){
    this.mostrarElemento = !this.mostrarElemento;
  }

  messageS: Message[] = [
    new Message("Texto 01 da Mensagem", "ViniciusRosalen"),
    new Message("Texto 02 da Mensagem", "RosalenSilva"),
    new Message("Texto 03 da Mensagem", "SilvaVinicius")
  ];

  messageBinding: Message = new Message("Conteudo", "Mateus");
  title = 'frontend';
}
 