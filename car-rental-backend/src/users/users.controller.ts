import { Controller, Get, Post, Body, BadRequestException, UnauthorizedException, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() body: { name: string; email: string; password: string },
  ): Promise<{ message: string; user: { id: number; name: string; email: string } }> {
    if (!body.name || !body.email || !body.password) {
      throw new BadRequestException('All fields (name, email, password) are required');
    }
    const result = await this.usersService.register(body);
    return result;
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Req() req: Request,
  ): Promise<{ message: string; userId: number }> {
    if (!body.email || !body.password) {
      throw new BadRequestException('Email and password are required');
    }

    const result = await this.usersService.login(body);
    const user = result.user; 

    req.session.userId = user.id; 
    console.log('User logged in, session userId:', req.session.userId);

    return { message: 'Login successful', userId: user.id };
  }

  @Get('session')
  async getSession(
    @Req() req: Request,
  ): Promise<{ message: string; userId: number }> {
    if (!req.session?.userId) {
      throw new UnauthorizedException('Not logged in');
    }

    return { message: 'User is logged in', userId: req.session.userId };
  }

  @Get('my-bookings')
  @UseGuards(AuthGuard)
  async getMyBookings(
    @Req() req: Request,
  ): Promise<{ message: string; bookings: any[] }> {
    const bookings = await this.usersService.getBookingsByUserId(req.session.userId!);
    return { message: 'User bookings fetched', bookings };
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
  ): Promise<{ message: string }> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject({ message: 'Error logging out' });
        else resolve({ message: 'Logged out successfully' });
      });
    });
  }
}
