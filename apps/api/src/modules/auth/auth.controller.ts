import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/request/sign-up.dto';
import { SignInDto } from './dto/request/sign-in.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'User registration',
    description: 'Creates new user account with specified role',
  })
  async register(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticates user and returns access token',
  })
  async login(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}
