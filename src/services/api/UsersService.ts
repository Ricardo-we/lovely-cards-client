import BaseRequest from "../../utils/libs/BaseRequest";
import { IUser } from "../../types/User";

const usersServiceReq = new BaseRequest("users");

export default class UsersService {
    
    static async createUser(user?: IUser){
        if(!user) return null;
        const response = await usersServiceReq.post(user, {});
        return response;
    }

    static async login(user?: IUser){
        if(!user) return null;
        const response = await usersServiceReq.post(user, { routeParams: "/login" });
        return response;
    }

    static async confirmUser(user_id?: number, code?: string){
        return await usersServiceReq.post({ user_id, user_code: code }, { routeParams: "/confirmation" })
    }
}