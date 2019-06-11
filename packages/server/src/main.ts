/*import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

const server: express.Express = express();

async function bootstrap(server) {
  const app = await NestFactory.create(AppModule, server);
  app.enableCors();
  // await app.listen(3000);
  app.init();
}
bootstrap(server);

export const api = functions.https.onRequest(server);*/

/*const server: express.Express = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());

const startNestApplication = async (expressInstance: any) => {
    const app = await NestFactory.create(AppModule, expressInstance);
    app.use(bodyParser.json());
    await app.init();
};

startNestApplication(server);

export const api = functions.https.onRequest(server);
*/

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
