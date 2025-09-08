// utils/loader.js

import fs from 'fs/promises';
import path from 'path';
import { logger } from './logger.js';

export default {
  async loadModules(folderName) {
    const modules = new Map();
    const folderPath = path.join(process.cwd(), folderName);
    
    try {
      const files = await fs.readdir(folderPath);
      const moduleFiles = files.filter(file => file.endsWith('.js'));
      
      for (const file of moduleFiles) {
        const modulePath = `file://${path.join(folderPath, file)}`;
        const module = await import(modulePath);
        if (module.default && module.default.name) {
          modules.set(module.default.name, module.default);
        } else {
          logger.warn(`Skipping module: ${file}. It does not have a valid 'name' or a default export.`);
        }
      }
      logger.info(`Successfully loaded ${modules.size} modules from '${folderName}' folder.`);
    } catch (err) {
      if (err.code === 'ENOENT') {
        logger.error(`Folder '${folderName}' not found. Please create it.`);
      } else {
        logger.error(`Error loading modules from '${folderName}': ${err.message}`);
      }
    }
    return modules;
  }
};
