import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
// import { authErrorInterceptor } from './app/shared/core/auth-error.interceptor';
// import { jwtInterceptor } from './app/shared/core/jwt.interceptor';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes),
provideHttpClient(), 
    //  provideHttpClient(withInterceptors([jwtInterceptor, authErrorInterceptor])),
     CookieService],

}).catch(err => console.error(err));
