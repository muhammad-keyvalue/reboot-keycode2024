import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import { join } from 'path';
import { FileData } from './fileData';

@Injectable()
export class FileService {
  // Run the shell script on the uploaded file
  public async runScript(file: Express.Multer.File): Promise<string> {
    const fileName = file.filename;
    const filePath = join(__dirname, '../..', 'uploads', fileName);

    // Run the shell script on the file asynchronously
    this.runShellScript(filePath);

    return 'Image upload initiated successfully, processing in the background.';
  }

  // Run the shell script on the uploaded file
  private runShellScript(filePath: string): void {
    const scriptPath = join(__dirname, '../../..', 'ai_model/output', 'run.py');
    const outputImagePath = 'src/processed';
    const jsonPath = 'src/processed';

    console.log(`Starting Python script: ${scriptPath} with file: ${filePath}`);

    // Use spawn to run the Python script
    const process = spawn('python3', [
      scriptPath,
      '--image',
      filePath,
      '--output_image_path',
      outputImagePath,
      '--json_path',
      jsonPath,
    ]);

    // Handle stdout
    process.stdout.on('data', (data) => {
      console.log(`Python script output: ${data}`);
    });

    // Handle stderr
    process.stderr.on('data', (data) => {
      console.warn(`Python script stderr: ${data}`);
    });

    // Handle script exit
    process.on('exit', (code) => {
      if (code === 0) {
        console.log(`Python script finished successfully.`);
      } else {
        console.error(`Python script exited with code: ${code}`);
      }
    });

    // Handle errors
    process.on('error', (error) => {
      console.error(`Error starting Python script: ${error.message}`);
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
