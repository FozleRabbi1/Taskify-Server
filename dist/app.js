"use strict";
// import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
// import router from './app/routes';
// const app: Application = express();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorHandlear_1 = __importDefault(require("./app/middleware/globalErrorHandlear"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["https://taskify-6e3cc.web.app", 'http://localhost:5173'],
    credentials: true,
}));
app.use('/api/v1', routes_1.default);
app.get('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const a = 'Server Running SuccessFully';
    res.send(a);
}));
app.use(globalErrorHandlear_1.default);
app.use('*', notFound_1.default);
exports.default = app;
