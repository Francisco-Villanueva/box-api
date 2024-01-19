import { IAuthBody } from '../auth.interface';
export declare class LoginAuthDto implements IAuthBody {
    user: string;
    password: string;
}
