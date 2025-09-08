// A utility file for the bot to perform various helper tasks
// This file is designed to be imported by other modules (e.g., commands, events)
// It contains reusable functions for common operations.

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger'); // The bot's custom logger

class Utilities {
  /**
   * Removes the command prefix from a message.
   * @param {string} message The raw message body.
   * @param {string} prefix The bot's command prefix.
   * @returns {string} The cleaned message.
   */
  static removePrefix(message, prefix) {
    if (message.startsWith(prefix)) {
      return message.slice(prefix.length).trim();
    }
    return message.trim();
  }

  /**
   * Downloads a file from a URL.
   * @param {string} url The URL of the file.
   * @param {string} filePath The local path to save the file.
   * @returns {Promise<string>} A promise that resolves with the file path.
   */
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
          logger.log(`Failed to write file from ${url}`, 'error');
          reject(err);
        });
      });
    } catch (error) {
      logger.log(`Failed to download file from ${url}: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Deletes a file from the local filesystem.
   * @param {string} filePath The path of the file to delete.
   */
  static deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
      if (err) {
        logger.log(`Failed to delete file: ${filePath}`, 'error');
      } else {
        logger.log(`Successfully deleted file: ${filePath}`, 'info');
      }
    });
  }

  /**
   * Generates a unique filename using a timestamp and a random number.
   * @param {string} extension The file extension (e.g., 'jpg', 'gif').
   * @returns {string} A unique filename.
   */
  static generateUniqueFilename(extension) {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 10000);
    return `${timestamp}_${randomNumber}.${extension}`;
  }
}

module.exports = Utilities;
