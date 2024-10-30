import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from './user.model';
import { UserService } from './signup.services';

@Component({
  selector: 'app-signup',   

  standalone: true,
  imports:   
 [ReactiveFormsModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  myForm!: FormGroup;

  private userService = inject(UserService);

  onSubmit(){
      const userAux = new User(
      this.myForm.value.emailTS,
      this.myForm.value.passwordTS, 
      this.myForm.value.firstNameTS, 
      this.myForm.value.lastNameTS, 
    );
    const testUser = this.userService.getUser(userAux.email).subscribe({
      next: (dadosSucesso: any) => {
        alert("Esse email já está registrado");
      },
      error: (err) => {
        this.userService.addUser(userAux).subscribe({
          next: (dadosSucesso: any) => {
              console.log(dadosSucesso.myMsgSucesso);
              console.log({content: dadosSucesso.objUserSave.content});
              console.log({_id: dadosSucesso.objUserSave._id});
          },
              error: (dadosErro) => {
              console.log(`$== !! Error (subscribe): $', dadosErro.info_extra ==`);
              console.log(dadosErro);
          }
        });
        this.myForm.reset();
      }
      });
  }


  ngOnInit() {
    this.myForm = new FormGroup({
      firstNameTS:   
 new FormControl(null, Validators.required),
      lastNameTS: new FormControl(null, [
        Validators.required,   

        Validators.minLength(4),
        Validators.maxLength(16)
      ]),
      emailTS: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}")
      ]),
      passwordTS: new FormControl(null, Validators.required)
    });
  }
}

// export class MessageInputComponent {
//   private messageService = inject(MessageService);

//   onSubmit(form: NgForm)
//   {
//       // console.log("messageInputComponent: ");
//       // console.log(form);
//       const messageAux = new Message(form.value.myContentngForm, 'Vini');
//       this.messageService.addMessage(messageAux).subscribe({
//           next: (dadosSucesso: any) => {
//               console.log(dadosSucesso.myMsgSucesso);
//               console.log({content: dadosSucesso.objMessageSave.content});
//               console.log({_id: dadosSucesso.objMessageSave._id});
//           },
//               error: (dadosErro) => {
//               console.log(`$== !! Error (subscribe): $', dadosErro.info_extra ==`);
//               console.log(dadosErro);
//           }
// });
//       form.resetForm();
//   }