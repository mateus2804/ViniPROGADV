import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-logout',
    standalone: true,
    template: ` <br>
                <br>
                <div class="col-md-8 col-md-offset-2">
                    <button class="btn btn-danger" (click)="onLogout()">Log out</button>
                </div> `
})

export class LogoutComponent {
    constructor(private router: Router) {}

    onLogout(){
        localStorage.clear()

        this.router.navigate(['/mensagens'])
    }
}