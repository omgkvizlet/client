import {IUser} from "../../types";
import {AxiosResponse} from "axios/index";
import {$api} from "../$api";

export class AuthService {
    static async registration(user:IUser):Promise<AxiosResponse>{
        return $api.post('/auth/register',{
            ...user
        })
    }
    static async login(user:IUser):Promise<AxiosResponse>{
        return $api.post('/auth/login', {
            username:user.username,
            password:user.password
        })
    }
}