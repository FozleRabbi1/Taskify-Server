// import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
// import router from './app/routes';
// const app: Application = express();

// app.use(express.json());
// app.use(cors());
// app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

// app.use('/api/v1', router);
// app.get('/', (req: Request, res: Response) => {
//   const a = 'Server Is Runnign Successfully';
//   res.send(a);
// });

// export default app;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import notFound from './app/middleware/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middleware/globalErrorHandlear';
const app: Application = express();

//parser
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);

app.use('/api/v1', router);

app.get('/test', async (req, res) => {
  const a = 'Server Running SuccessFully';
  res.send(a);
});

app.use(globalErrorHandler);
app.use('*', notFound);

export default app;
