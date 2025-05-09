import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    register(userData: {
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
    }): Promise<{
        message: string;
        user: {
            id: number;
            name: string;
            email: string;
        };
    }>;
    getBookingsByUserId(userId: number): Promise<{
        id: number;
        carId: number;
        userId: number;
        start_date: Date;
        end_date: Date;
    }[]>;
}
