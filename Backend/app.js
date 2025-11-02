import expres, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectDB from './db/db.js';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';


const app = expres();
const PORT = process.env.PORT ;

connectDB();

app.use(morgan('dev'));
app.use(expres.json());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);


app.get('/', (req, res) => {
  res.send('DevinAi Backend is running');
});

export default app;