import { Request } from 'express';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(body: {
        name: string;
        email: string;
        password: string;
    }): Promise<any>;
    login(body: {
        email: string;
        password: string;
    }, req: Request): Promise<any>;
    getSession(req: Request): Promise<any>;
    getMyBookings(req: Request): Promise<any>;
    logout(req: Request): Promise<any>;
}
