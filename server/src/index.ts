import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { Configuration, OpenAIApi } from 'openai';
import openAiRoutes from '../src/routes/openai';

/* CONFIG */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

/* OPEN AI CONFIG */

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

/* ROUTES */
app.use('/openai', openAiRoutes);

// const completion = await openai.createCompletion({
//   model: "text-davinci-003",
//   prompt: "Hello world",
// });
// console.log(completion.data.choices[0].text);

/* SERVER SETUP  */
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Online ❤️🫥 in http://localhost:${PORT}`);
});
