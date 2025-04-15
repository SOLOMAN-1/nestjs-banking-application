import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUser } from './typeorm/entity/registeruser';
import { JwtModule } from '@nestjs/jwt';
import { Passport } from 'passport';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/localstrategy';
import { LocalGuard } from './guards/localguard';
import { JWTStrategy } from './strategies/jwtstrategy';
import { RolesGuard } from './guards/rolesguard';
import { Transaction } from './typeorm/entity/trannsaction';

@Module({
  imports: [TypeOrmModule.forFeature([RegisterUser,Transaction]),
    JwtModule.register({
      secret: 'solomanvarghese@123',
      signOptions: { expiresIn: '1h', }
    }),PassportModule],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,LocalGuard,JWTStrategy,RolesGuard]
})
export class AuthModule {}
