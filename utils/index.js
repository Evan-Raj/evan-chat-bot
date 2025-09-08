// utils/index.js

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { logger } from './logger.js'; // The path is correct since logger.js is in the same folder

export class Utilities {
  static removePrefix(message, prefix) {
    if (message.startsWith(prefix)) {
      return message.slice(prefix.length).trim();
    }
    return message.trim();
  }

  static async downloadFile(url, filePath) {
    try {
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
      });
      return new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);
        writer.on('finish', () => resolve(filePath));
        writer.on('error', (err) => {
          logger.error(`Failed to write file from ${url}`);
          reject(err);
        });
      });
    } catch (error) {
      logger.error(`Failed to download file from ${url}: ${error.message}`);
      throw error;
    }
  }

  static deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
      if (err) {
        logger.error(`Failed to delete file: ${filePath}`);
      } else {
        logger.info(`Successfully deleted file: ${filePath}`);
      }
    });
  }
}
