import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, of, retry} from "rxjs";
import {JwtService} from "../../../service/jwt/jwt.service";
import {inject} from "@angular/core";
import {AuthenticationService} from "../../../service/authentication/authentication.service";
import {Router} from "@angular/router";
import {RedirectService} from "../../../service/redirect/redirect.service";

export const forbiddenAuthenticationInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
            const jwtService = inject(JwtService);
            const authenticationService = inject(AuthenticationService);
            const redirectService = inject(RedirectService);
            const router = inject(Router);
            jwtService.removeAccessToken();
            authenticationService.refreshToken().then((response) => {
                if (response === null) {
                    jwtService.removeTokens();
                    router.navigate(['/login']).then(() => console.debug('User is not authorized. Redirect to login page (forbidden authentication interceptor)'));
                    return;
                }
                jwtService.saveTokens(response.access_token, response.refresh_token);
                redirectService.reloadCurrentRoute();
                console.debug('Token refreshed. Continue... (forbidden authentication interceptor)');
            })
        }
        return of(error.error)
    }));
};
