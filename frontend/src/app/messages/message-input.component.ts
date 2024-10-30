import { FormsModule, NgForm } from "@angular/forms";
import { Component, inject } from "@angular/core";
import { MessageService } from "./message.services";
import { Message } from "./message.model";

@Component({
    selector: 'app-message-input',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './message-input.component.html',
    styles: `input.ng-invalid.ng-touched {border: 1px solid red;}`
})

export class MessageInputComponent {
    private messageService = inject(MessageService);

    onSubmit(form: NgForm)
    {
        // console.log("messageInputComponent: ");
        // console.log(form);
        const messageAux = new Message(form.value.myContentngForm, 'Vini');
        this.messageService.addMessage(messageAux).subscribe({
            next: (dadosSucesso: any) => {
                console.log(dadosSucesso.myMsgSucesso);
                console.log({content: dadosSucesso.objMessageSave.content});
                console.log({_id: dadosSucesso.objMessageSave._id});
            },
                error: (dadosErro) => {
                console.log(`$== !! Error (subscribe): $', dadosErro.info_extra ==`);
                console.log(dadosErro);
            }
});
        form.resetForm();
    }
}