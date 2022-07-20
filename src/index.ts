import http from 'http';
import { AddressInfo } from 'net';
import { app } from './app.js';
import { mongooseConnect } from './db/mongoose.js';

const PORT = process.env.PORT || 3200;

const onError = (err: Error) => {
    console.log(err.message);
};
const onListening = () => {
    const addr = server.address();
    //  { address: '::', family: 6, port: 3400 }
    const bind =
        typeof addr === 'string'
            ? 'pipe ' + addr
            : addr?.address === '::'
            ? `http://localhost:${(addr as AddressInfo).port}`
            : (addr as AddressInfo).address + (addr as AddressInfo).port;

    console.log(`Listening on ${bind}`);
};

mongooseConnect();
app.set('port', PORT);
export const server = http.createServer(app);
server.on('error', onError);
server.on('listening', onListening);
server.listen(PORT);
