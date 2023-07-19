const path = require('path');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const PUBLIC_URL = process.env.PUBLIC_URL || `http://${HOST}:${PORT}`;

const ROOT_DIR = path.resolve(__dirname, '../..');

const ICON_REGEX = /\.(ico)$/i;
const IMG_REGEX = /\.(png|jpg|jpeg|webp)$/i;
const GIF_REGEX = /\.(gif)$/i;
const SVG_REGEX = /\.(svg)$/i;
const FILE_REGEX = [ICON_REGEX, IMG_REGEX, GIF_REGEX, SVG_REGEX];
const STYLE_REGEX = /\.(css|scss)$/i;
const SOURCE_REGEX = /\.(ts)$/i;
const VUE_SOURCE_REGEX = /\.vue$/i;

const MAX_SIZE = 360000;

module.exports = {
  HOST,
  PORT,
  PUBLIC_URL,
  ROOT_DIR,
  FILE_REGEX,
  ICON_REGEX,
  IMG_REGEX,
  GIF_REGEX,
  SVG_REGEX,
  STYLE_REGEX,
  SOURCE_REGEX,
  VUE_SOURCE_REGEX,
  MAX_SIZE
};
