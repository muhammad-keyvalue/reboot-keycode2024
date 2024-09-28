import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import { join } from 'path';
import { FileData } from './fileData';

@Injectable()
export class FileService {
  // Run the shell script on the uploaded file
  public async runScript(file: Express.Multer.File): Promise<string> {
    const fileName = file.filename;
    const filePath = join(__dirname, '../..', 'uploads', fileName);

    // Run the shell script on the file
    await this.runShellScript(filePath);

    return 'Image uploaded and processed successfully';
  }

  // Run the shell script on the uploaded file
  private runShellScript(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const scriptPath = join(
        __dirname,
        '../../..',
        'ai_model/output',
        'run.py',
      );

      const outputImagePath = 'src/processed';
      const jsonPath = 'src/processed';

      // Log the start of the process
      console.log(`Executing Python script: ${scriptPath}`);
      console.log(`File path: ${filePath}`);

      // Execute the Python script using 'exec'
      exec(
        `python3 ${scriptPath} --image ${filePath} --output_image_path ${outputImagePath} --json_path ${jsonPath}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            return reject(`Error executing Python script: ${error.message}`);
          }

          if (stderr) {
            console.warn(`Python script stderr: ${stderr}`);
          }

          console.log(`Python script output: ${stdout}`);
          resolve(stdout); // Return the Python script output
        },
      );
    });
  }

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

  async getProcessedData(imageName: string): Promise<FileData[]> {
    // Path to the JSON file
    const filePath = join(
      process.cwd(),
      '..',
      '/backend/src/processed',
      'output.json',
    );

    // Read and parse the JSON file
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const parsedData = JSON.parse(jsonData);

    // Filter data based on the fileName
    const filteredData: FileData[] = parsedData
      .filter((item) => item.imageName === imageName)
      .map((item) => ({
        url: item.downloadUrl,
        detectionRate: item.detectionRate,
      }));

    return filteredData;
  }
}
