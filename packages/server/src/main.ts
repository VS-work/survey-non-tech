import * as functions from 'firebase-functions';
import * as express from 'express';
import { Express } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const server: Express = express();
const expressAdapter = new ExpressAdapter(server);

const startNestApplication = async (expressAdapter: ExpressAdapter) => {
  const app = await NestFactory.create(AppModule, expressAdapter);
  app.init();
}

startNestApplication(expressAdapter);
exports.api = functions.https.onRequest(server);
