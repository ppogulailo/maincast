import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  // @Post('signin')
  // async signin(
  //   @Body() data: AuthDto,
  //   @Res({ passthrough: true }) response: Response,
  // ) {
  //   const jwt = await this.authService.signIn(data);
  //
  //   response.cookie('jwt', jwt, {
  //     maxAge: 30 * 24 * 60 * 60 * 1000,
  //     httpOnly: true,
  //   });
  //   return { jwt: jwt.tokens.accessToken, id: jwt.id };
  // }
}
