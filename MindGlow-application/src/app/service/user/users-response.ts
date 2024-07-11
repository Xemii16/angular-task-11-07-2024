export interface UsersResponse {
    users: User[];
    hasNext: boolean;
}

export interface User {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export interface EnableUser {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
}