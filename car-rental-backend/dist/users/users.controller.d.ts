import { Request } from 'express';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(body: {
        name: string;
        email: string;
        password: string;
    }): Promise<{
        message: string;
        user: {
            id: number;
            name: string;
            email: string;
        };
    }>;
    login(body: {
        email: string;
        password: string;
    }, req: Request): Promise<{
        message: string;
        userId: number;
    }>;
    getSession(req: Request): Promise<{
        message: string;
        userId: number;
    }>;
    getMyBookings(req: Request): Promise<{
        message: string;
        bookings: any[];
    }>;
    logout(req: Request): Promise<{
        message: string;
    }>;
}
