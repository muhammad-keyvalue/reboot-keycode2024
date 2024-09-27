import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
// import { exec } from 'child_process';
import { join } from 'path';

@Injectable()
export class FileService {
  getImage(imageName: string, res: Response) {
    const filePath = join(
      process.cwd(),
      '..',
      '/backend/src/processed',
      imageName,
    );
    // Check if the file exists
    if (existsSync(filePath)) {
      const stream = createReadStream(filePath);
      stream.pipe(res);
    } else {
      throw new NotFoundException('Image not found');
    }
  }

  public async runScript(file: Express.Multer.File): Promise<string> {
    const originalName = file.filename.split('.')[0];
    const filePath = join(__dirname, '../..', 'uploads', originalName);
    // Run the shell script on the file
    const result = await this.runShellScript(filePath);

    return result;
  }

  // Run the shell script on the uploaded file
  private runShellScript(filePath: string) {
    // return new Promise((resolve, reject) => {
    //   const scriptPath = join(__dirname, '..', 'scripts', 'process-image.sh');
    //   exec(`sh ${scriptPath} ${filePath}`, (error, stdout, stderr) => {
    //     if (error) {
    //       reject(`Error executing script: ${error.message}`);
    //     }
    //     if (stderr) {
    //       reject(`Script error: ${stderr}`);
    //     }
    //     resolve(stdout);
    //   });
    // });
    return `${filePath}`;
  }
}
