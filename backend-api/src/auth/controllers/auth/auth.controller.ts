import { Body, Controller, Post } from '@nestjs/common';
import { Observable, from, map } from 'rxjs';
import { User } from 'src/auth/models/user.interface';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('register')
    register(@Body() user: User): Observable<User> {
        return this.authService.registerAccount(user);
    }
    
    @Post('login')
    login(@Body() emailPass: User):any {
        return this.authService.login(emailPass).pipe(map((jwt: string) => ({ token: jwt})))
    }
}
