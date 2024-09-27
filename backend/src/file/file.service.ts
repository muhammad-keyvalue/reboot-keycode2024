import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
    getImage(imageName: string, res: Response) {
        const filePath = join(process.cwd(), '..', '/backend/src/processed', imageName);
        // Check if the file exists
        if (existsSync(filePath)) {
          const stream = createReadStream(filePath);
          stream.pipe(res);
        } else {
            throw new NotFoundException('Image not found');
        }
      }
}
