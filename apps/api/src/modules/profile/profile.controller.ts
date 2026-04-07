/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Patch, Post, Delete, Param, UseGuards, UseInterceptors, UploadedFile, ParseIntPipe, BadRequestException, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUserId } from '../auth/decorators/current-user.decorator';
import { ProfileService } from './profile.service';
import { UpdateBasicDto } from './dto/update-basic.dto';
import { UpdateFaithLifestyleDto } from './dto/update-faith-lifestyle.dto';
import { UpdateFaithValuesDto } from './dto/update-faith-values.dto';
import { UpdateLifestyleDto } from './dto/update-lifestyle.dto';
import { successResponse } from '../../common/response/api-response';
import { ACCESS_TOKEN_COOKIE } from '../auth/auth-cookie.constants';
import type { Response } from 'express';

@ApiTags('Profile & Photos')
@Controller('profile')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get()
  @ApiOperation({ summary: 'Get my profile (view)' })
  getProfile(@CurrentUserId() userId: string) {
    return this.profileService.getProfile(userId);
  }

@Patch('basic')
@ApiOperation({ summary: 'Edit profile: basic info (name, age, location, gender, photo)' })
updateBasic(
  @CurrentUserId() userId: string,
  @Body() dto: UpdateBasicDto,
) {
  return this.profileService.updateBasic(userId, dto);
}

  @Patch('faith-lifestyle')
  @ApiOperation({ summary: 'Edit profile: faith & lifestyle (denomination, church)' })
  updateFaithLifestyle(
    @CurrentUserId() userId: string,
    @Body() dto: UpdateFaithLifestyleDto,
  ) {
    return this.profileService.updateFaithLifestyle(userId, dto);
  }

  @Patch('faith-values')
  @ApiOperation({ summary: 'Edit profile: faith values & partner values' })
  updateFaithValues(
    @CurrentUserId() userId: string,
    @Body() dto: UpdateFaithValuesDto,
  ) {
    return this.profileService.updateFaithValues(userId, dto);
  }

  @Patch('lifestyle')
  @ApiOperation({ summary: 'Edit profile: lifestyle basics (smoking, alcohol, diet)' })
  updateLifestyle(
    @CurrentUserId() userId: string,
    @Body() dto: UpdateLifestyleDto,
  ) {
    return this.profileService.updateLifestyle(userId, dto);
  }

  @Get('photos')
  @ApiOperation({ summary: 'Get my profile photos (list with URLs); includes meetsMinimum (min 3 required)' })
  async getPhotos(@CurrentUserId() userId: string) {
    return this.profileService.getPhotos(userId);
  }

  @Post('photos')
  @UseInterceptors(FileInterceptor('photo'))
  @ApiOperation({ summary: 'Upload one profile photo (JPEG/PNG/WebP, max 5MB)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: { type: 'object', properties: { photo: { type: 'string', format: 'binary' } } } })
  async addPhoto(
    @CurrentUserId() userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Photo file is required.');
    }
    const result = await this.profileService.addPhoto(userId, file);
    return successResponse('Photo saved successfully.', {
      data: { photos: result.photos },
    });
  }

  @Delete('photos/:index')
  @ApiOperation({ summary: 'Delete profile photo by index (0-based)' })
  async deletePhoto(
    @CurrentUserId() userId: string,
    @Param('index', ParseIntPipe) index: number,
  ) {
    return this.profileService.deletePhoto(userId, index);
  }

  @Delete('account')
  @ApiOperation({ summary: 'Delete my account permanently (DB + S3 assets)' })
  async deleteMyAccount(
    @CurrentUserId() userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.profileService.deleteAccount(userId);
    res.clearCookie(ACCESS_TOKEN_COOKIE, { path: '/' });
    return result;
  }
}
