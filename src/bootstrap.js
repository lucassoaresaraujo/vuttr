import * as dotenv from 'dotenv';

export default dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

require('dotenv').config();
