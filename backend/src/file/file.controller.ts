import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload/:suffix')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const suffix = req.params.suffix;
          const originalName = file.originalname.split('.')[0];
          const fileExt = file.originalname.split('.').pop();
          const fileName = `${originalName}-${suffix}.${fileExt}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Accept only image files (jpg, jpeg, png)
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.fileService.runScript(file);
    return { message: 'File uploaded and processed', result };
  }
}
