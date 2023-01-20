"use strict";
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
// import "module-alias/register";
const express_1 = __importDefault(require("express"));
const connect_1 = __importDefault(require("./Utils/connect"));
const router_1 = __importDefault(require("./router"));
var cors = require("cors");
const port = 3000;
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
// app.use(express.json());
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`App is listening on http://localhost:${port}`);
    yield (0, connect_1.default)();
    // await connectRedis();
    app.use(router_1.default);
    //   swaggerDocs(app, port);
    //   app.use("/", routes);
}));
