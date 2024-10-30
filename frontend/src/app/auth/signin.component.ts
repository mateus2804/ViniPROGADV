import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from "@angular/forms";
import { UserService } from "./signup.services";
import { Router } from "@angular/router";

@Component({
    selector: 'app-signin',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit {
    myFormIn! : FormGroup;

    constructor(private fb: FormBuilder)
    {
        
    }

    router = inject(Router);

    private userService = inject(UserService)

    minusculoFValidator(control: AbstractControl) {
        const pass = control.value as string;
      
        if ((pass !== pass?.toLowerCase()) && (pass !== null)) {
          return { minusculoF: true };
        } else {
          return null;
        }
      }

      user: any;

      logIn(email: string, password: string) {
        this.userService.getUser(email).subscribe({
            next: (dadosSucesso: any) => {
                if (dadosSucesso?.objUser?.password === password) {
                    alert("Login efetuado com sucesso!");
                    localStorage.setItem('UserLogado', JSON.stringify(dadosSucesso.objUser))
                } else {
                    alert("Senha errada!");
                }
            },
            error: (err) => {
                alert("Esse email não existe");
                console.error("Erro ao fazer login:", err);
            }
        });
    }

    onSubmit(){
        const email = this.myFormIn.value.emailTS;
        const password = this.myFormIn.value.passwordTS;
        this.logIn(email, password);
        this.myFormIn.reset();
        this.router.navigate(['/mensagens'])
    }

    ngOnInit() {
        
    this.myFormIn = this.fb.group({
        emailTS: [
            null,
            Validators.compose([
            Validators.required,
            Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
          ])
        ],
        passwordTS: [
            null,
            Validators.compose([
            Validators.required,
            Validators.minLength(4),
            this.minusculoFValidator
          ])
        ]
      });
    }
}