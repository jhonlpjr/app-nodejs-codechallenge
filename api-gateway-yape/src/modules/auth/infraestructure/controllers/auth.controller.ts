import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from '../../application/services/auth.service';
import { SuccessResponseDto } from 'src/shared/dtos/api/response/succes.res.dto';
import { ErrorResponseDto } from 'src/shared/dtos/api/response/error.res.dto';
import { LoginReqDTO } from '../../application/dto/request/login.req.dto';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: 'Login' })
  @ApiOkResponse({ type: SuccessResponseDto })
  @ApiBadRequestResponse({ type: ErrorResponseDto })
  @Post('login')
  async login(@Body() params: LoginReqDTO) {
    const loginRes = await this.authService.login(
      params.username,
      params.password,
    );
    return new SuccessResponseDto({
      message: 'Login exitoso',
      data: loginRes,
    });
  }
}
