export interface IUser {
    id?: number;
    username: string;
    password?: string;
    email: string;
    isActive?: boolean;
    theme?: object | any;
    language?: object;
    language_id?: number;
}

export interface FullUser {
    user: IUser,
    token: string;
}