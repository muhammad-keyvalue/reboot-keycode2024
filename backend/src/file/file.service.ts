import { Injectable } from '@nestjs/common';
// import { exec } from 'child_process';
import { join } from 'path';

@Injectable()
export class FileService {
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
