import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt/jwt.strategy';
import { UserService } from './services/user/UserService';
import { UserController } from './controllers/user/user.controller';
import { FriendRequestEntity } from './models/friend_request.entity';


@Module({
  imports: [JwtModule.registerAsync({
    useFactory:()=>({
      secret:process.env.JWT_SECRET_KEY,
      signOptions:{expiresIn:"3600s"}
    })
  }),
  TypeOrmModule.forFeature([UserEntity,FriendRequestEntity])
],

  controllers: [AuthController, UserController],
  providers: [AuthService,JwtGuard,JwtStrategy, UserService],
  exports:[UserService]
})
export class AuthModule {}
