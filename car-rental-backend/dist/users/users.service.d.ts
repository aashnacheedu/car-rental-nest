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
        userId: number;
        name: string;
        email: string;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
        userId: number;
        name: string;
        email: string;
    }>;
    getBookingsByUserId(userId: number): Promise<{
        id: number;
        end_date: Date;
        start_date: Date;
        status: string;
        userId: number;
        carId: number;
        createdAt: Date;
    }[]>;
}
