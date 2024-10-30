import { inject, Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
    private baseUrl = 'http://localhost:3000'; 


    private userService: User[] = [];

    errorHandler(e: any, info: string) : Observable<any> {
        throw({
            info_extra: info,
            error_SS: e,
            error_CS: "Client-side : Ocorreu um erro!"
        })
    }

    private http = inject(HttpClient);

    addUser(user: User) : Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/user`, user).pipe(
            map((response: any) => {
                console.log("Mensagem salva com ID:", user.userId);
    
                return response;
            }),
            catchError((e) => this.errorHandler(e, 'addUser()'))
        );
    }

    getUser(email: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/user/${email}`);
    }


    // addMessage(message: Message) : Observable<any> {
    //     return this.http.post<any>(`${this.baseUrl}/message`, message).pipe(
    //         map((response: any) => {
    //             message.messageId = response.objMessageSave._id;
    //             console.log("Mensagem salva com ID:", message.messageId);
    
    //             // this.messageSService.push(message);
    //             // console.log(this.messageSService);
    
    //             return response;
    //         }),
    //         catchError((e) => this.errorHandler(e, 'addMessage()'))
    //     );
    // }

}