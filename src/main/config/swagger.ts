import { Express } from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

export const setupSwagger = (app: Express): void => {
  const swaggerFile = path.resolve(__dirname, 'swagger-output.json');

  if (!fs.existsSync(swaggerFile)) {
    console.error(`[Swagger] Arquivo não encontrado: ${swaggerFile}`);
    return;
  }

  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFile, 'utf8'));

  app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      explorer: true,
    }),
  );
};
