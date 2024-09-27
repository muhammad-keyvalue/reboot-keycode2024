import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { FileService } from './file.service';
import { Response } from 'express';

@Controller('file')
export class FileController {
    constructor(private _fileService: FileService) {}
    @Get('/:imageName')
    async findAll(@Param('imageName') imageName: string, @Res() res: Response) {
      return this._fileService.getImage(imageName,res);
    }

}
