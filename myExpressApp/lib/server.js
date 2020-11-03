var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const loaders = require('./loaders');
//import x from '../src/loaders'
const express = require('express');
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express();
        yield loaders.default({ expressApp: app });
        app.listen(process.env.PORT, err => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`Your server is ready !`);
        });
    });
}
startServer();
