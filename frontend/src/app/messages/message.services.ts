import { inject, Injectable } from '@angular/core';
import { Message } from './message.model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MessageService {
    private baseUrl = 'http://localhost:3000'; 


    private messageSService: Message[] = [];

    errorHandler(e: any, info: string) : Observable<any> {
        throw({
            info_extra: info,
            error_SS: e,
            error_CS: "Client-side : Ocorreu um erro!"
        })
    }

    private http = inject(HttpClient);

    addMessage(message: Message) : Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/message`, message).pipe(
            map((response: any) => {
                message.messageId = response.objMessageSave._id;
                console.log("Mensagem salva com ID:", message.messageId);
    
                // this.messageSService.push(message);
                // console.log(this.messageSService);
    
                return response;
            }),
            catchError((e) => this.errorHandler(e, 'addMessage()'))
        );
    }

    deleteMessage(message: Message) : Observable<any>{
        this.messageSService.splice(this.messageSService.indexOf(message), 1);

        return this.http.delete<any>(`${this.baseUrl}/message/${message.messageId}`).pipe(
            catchError((e) => this.errorHandler(e, 'deleteMessage()')))
    }

    getMessages() : Observable<any>{
        return this.http.get<any>(`${this.baseUrl}/message`).pipe(
            map((responseRecebida: any) => {
                console.log(responseRecebida);
                // console.log({content: responseRecebida.objSMessageSRecuperadoS[0].content});
                // console.log({content: responseRecebida.objSMessageSRecuperadoS[0]._id});

                const messageSResponseRecebida = responseRecebida.objMessageSRecuperadoS;
                console.log(messageSResponseRecebida)

                let trasnformedCastMessagesModelFrontend: Message[] = [];
                for (let msg of messageSResponseRecebida)
                {
                    trasnformedCastMessagesModelFrontend.push(
                        new Message(msg.content, msg.firtName, msg.user, msg._id)
                    );
                }

                this.messageSService = [...trasnformedCastMessagesModelFrontend];
                responseRecebida.objSMessageSRecuperadoS = this.messageSService;

                return responseRecebida;
            }),
            catchError((e) => this.errorHandler(e, 'getMessages()')));
            
    }
}