import dotenv from 'dotenv';
import parseArgs from 'minimist';

const options= {alias:{p:"port", m:"modo"}};
const puerto = parseArgs(process.argv,options).port;
const modo = parseArgs(process.argv,options).modo;

dotenv.config();

export const ServidorEnvioEmail = {
  service: process.env.MAIL_SMTP,
  port: parseInt(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }
}

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || 'localhost',
  PORT: puerto || process.env.PORT,
  MODO: modo,
  MONGO_URL: process.env.MONGO_URL||'noURL',
  MONGO_DB: process.env.MONGO_BASE||'ecommerce' 
}
