import express from 'express';
import routes from './routes';

const app = express();

app.get('/', (request, response) =>
  response.json({ message: 'Hello everyone!' }),
);

app.listen(3333);
