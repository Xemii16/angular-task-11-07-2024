import {Injectable} from '@angular/core';
import {apiUrl} from "../../utility/storage";
import {HttpClient} from "@angular/common/http";
import {UserResponse} from "./user-response";
import {JwtService} from "../jwt/jwt.service";
import {EnableUser, UsersResponse} from "./users-response";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    url: string = apiUrl + '/users';

    constructor(
        private http: HttpClient,
        private jwtService: JwtService
    ) {
    }

    getUser(): Promise<UserResponse | null> {
        return new Promise((resolve) => {
            this.http.get<UserResponse>(this.url + "/" + this.jwtService.getAccessToken()).subscribe({
                next: (response: UserResponse) => {
                    resolve(response);
                },
                error: (err) => {
                    resolve(null);
                }
            });
        });
    }

    getUserById(id: string): Promise<UserResponse | null> {
        return new Promise((resolve) => {
            this.http.get<UserResponse>(this.url + "/id?id=" + id).subscribe({
                next: (response: UserResponse) => {
                    resolve(response);
                },
                error: (err) => {
                    resolve(null);
                }
            });
        });
    }

    getUserAsync(): Promise<UserResponse | null> {
        return new Promise((resolve) => {
            this.jwtService.getAccessTokenAsync().then((token) => {
                this.http.get<UserResponse>(this.url + "/" + token).subscribe({
                    next: (response: UserResponse) => {
                        resolve(response);
                    },
                    error: (err) => {
                        resolve(null);
                    }
                });
            });
        });
    }

    getUsers(enabled: boolean, pageNumber: number, pageSize: number = 50, startLastnameWith: string = ''): Promise<UsersResponse | null> {
        return new Promise((resolve) => {
            this.http.get<UsersResponse>(this.url + "?pageNumber=" + pageNumber + "&pageSize=" + pageSize + "&startLastnameWith=" + startLastnameWith + "&enabled=" + enabled).subscribe({
                next: (response: UsersResponse) => {
                    resolve(response);
                },
                error: (err) => {
                    resolve(null);
                }
            });
        });
    }

    enableUser(user: EnableUser): Promise<void> {
        return new Promise((resolve) => {
            this.http.patch(this.url + "/enable", user).subscribe({
                next: () => {
                    resolve();
                },
                error: (err) => {
                    resolve();
                }
            });
        });

    }
}
