import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  nodeEnv: process.env.NODE_ENV || 'production',
  port: parseInt(process.env.PORT, 10) || 3000,
  swaggerEnabled: process.env.SWAGGER_ENABLED === 'true',
}));
