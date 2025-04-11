import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUser } from './typeorm/entity/registeruser';

@Module({
  imports: [TypeOrmModule.forFeature([RegisterUser])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
