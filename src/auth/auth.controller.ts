import { Body, Controller, Post, Request, UseGuards ,Get, Param} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerdto';
import { builtinModules } from 'module';
import { LoginDto } from './dto/logindto';
import { AuthMechanism } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { LocalGuard } from './guards/localguard';
import { JWTGuard } from './guards/jwtguard';
import { Roles } from './decorators/rolesguard';
import { RolesGuard } from './guards/rolesguard';

@Controller('bank')
export class AuthController {
    constructor(private  authService: AuthService,private jwtservice:JwtService) {}
    @Post('register')
    register(@Body() registerDto:RegisterDto) {
        return this.authService.register(registerDto);
    }
    @UseGuards(LocalGuard)
    @Post('login')
    login(@Request() req) {
        console.log(req.user);
        const { password,isBlocked,loginAttempt, ...userWithoutPassword } = req.user;
        return this.jwtservice.sign(userWithoutPassword);
    }
    @Get('approve/:id')
    @Roles('ADMIN')
    @UseGuards(JWTGuard,RolesGuard)
    approve(@Param('id') id : bigint) {
        // return this.authService.details(id);
        return this.authService.approve(id);;
    }
    @Post('deposit')
    @UseGuards(JWTGuard)
    deposit(@Request() req,@Body() body) {
        return this.authService.deposit(req.user.id,body.depositAmount);
    }
    @Post('withdraw')
    @UseGuards(JWTGuard)
    withdraw(@Request() req, @Body() body) {
        return this.authService.withdraw(req.user.id, body.withdrawAmount);
    }
    @Post('transfer')
    @UseGuards(JWTGuard)
    transfer(@Request() req, @Body() body) {
        return this.authService.transfer(req.user.id,body);
    }
}
