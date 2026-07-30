import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Query,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UploaderService } from './uploader.service';
@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploadService: UploaderService) {}
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Query('uid') uid: string,
  ) {
    return this.uploadService.uploadAvatar(file, uid);
  }
  
  @Post('authentication')
  async uploadIdentity(
    @Body()
    data: {
      realName: string;
      identity: string;
      userId: string;
      imageUrl: string;
    },
    @Query('uid') uid: string,
  ) {
    return this.uploadService.uploadIdentity(data, uid);
  }
}
