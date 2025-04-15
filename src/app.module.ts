import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterUser } from './auth/typeorm/entity/registeruser';
import { Transaction } from './auth/typeorm/entity/trannsaction';

@Module({
  imports: [AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'pass@word1',
      database: 'banking',
      entities: [RegisterUser,Transaction],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
