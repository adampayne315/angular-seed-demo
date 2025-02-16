import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import realmRoutes from './routes/realmRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', realmRoutes);

export default app;