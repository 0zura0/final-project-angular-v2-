import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';


@Module({
  imports: [JwtModule.registerAsync({
    useFactory:()=>({
      secret:process.env.JWT_SECRET_KEY,
      signOptions:{expiresIn:"3600s"}
    })
    // secret:process.env.jwtSecret,
  }),
  TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController, UserController],
  providers: [AuthService,JwtGuard,JwtStrategy, UserService],
  exports:[UserService]
})
export class AuthModule {}
