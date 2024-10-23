import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { MessageService } from './messages/message.services';
import { UserService } from './auth/signup.services';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(), 
    { provide: MessageService },
    { provide: UserService}]
};
 