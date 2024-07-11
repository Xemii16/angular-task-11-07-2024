import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationResponse} from "./authentication.response";
import {RegisterRequest} from "./register.request";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private readonly url: string = 'http://localhost:8080/api/v1' + '/auth';

    constructor(
        private http: HttpClient,
    ) {
    }

    authenticate(email: string, password: string, remember: boolean): Promise<AuthenticationResponse | null> {
        return new Promise((resolve) => {
            this.http.post<AuthenticationResponse>(this.url + "/authenticate", {
                email,
                password
            }).subscribe({
                next: (response: AuthenticationResponse): void => {
                    resolve(response);
                },
                error: (err) => {
                    resolve(null);
                }
            });
        });
    }

    checkTakenEmail(email: string): Promise<boolean> {
        return new Promise((resolve) => {
            this.http.get<boolean>(this.url + "/email?email=" + email).subscribe({
                next: (response: boolean) => {
                    resolve(response);
                },
                error: (err) => {
                    resolve(false);
                }
            });
        });
    }

    register(param: RegisterRequest): Promise<AuthenticationResponse | null> {
        return new Promise((resolve) => {
            this.http.post<AuthenticationResponse>(this.url + "/register", param).subscribe({
                next: (response: AuthenticationResponse) => {
                    resolve(response);
                },
                error: () => {
                    resolve(null);
                }
            });
        });
    }

    refreshToken(): Promise<AuthenticationResponse | null> {
        return new Promise((resolve) => {
            this.http.post<AuthenticationResponse>(this.url + "/refresh-token", '', {}).subscribe({
                next: (response: AuthenticationResponse): void => {
                    resolve(response);
                },
                error: (err) => {
                    resolve(null);
                }
            });
        });
    }

    logout(): Promise<boolean> {
        return new Promise((resolve) => {
            this.http.post(this.url + "/logout", {}).subscribe({
                next: () => {
                    resolve(true);
                },
                error: () => {
                    resolve(false);
                }
            });
        });
    }
}
