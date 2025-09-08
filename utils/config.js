// utils/config.js

import dotenv from 'dotenv';
dotenv.config();

export const prefix = "/";
export const adminID = "61565208716445";

// Load appState securely from .env
export const fcaOption = {
  appState: JSON.parse(process.env.FCA_APPSTATE),
  selfListen: true,
};
