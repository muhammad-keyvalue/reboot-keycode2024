import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileService } from './file.service';
import { FileData } from './fileData';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('/:imageName')
  async getImage(@Param('imageName') imageName: string, @Res() res: Response) {
    return this.fileService.getImage(imageName, res);
  }

  @Get('/processedData/:imageName')
  async getProcessedData(
    @Param('imageName') imageName: string,
  ): Promise<FileData[]> {
    return this.fileService.getProcessedData(imageName);
  }

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
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const result = await this.fileService.runScript(file);

      return res.status(200).json({
        message: 'File uploaded and Python script executed successfully',
        result: result,
      });
    } catch (error) {
      console.error('Error executing Python script:', error);

      return res.status(500).json({
        message: 'Error executing Python script',
        error: error,
      });
    }
  }
}
