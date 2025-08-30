// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { CookieService } from 'ngx-cookie-service';
// import { AuthService } from '../services/Auths/auth.service';

// export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

//   const auth = inject(AuthService);
//   const token = auth.getToken();


//   if (token ) {
//     req = req.clone({
//       setHeaders: { Authorization: `Bearer ${token}` }
//     });
//   }

//   return next(req);
// };
