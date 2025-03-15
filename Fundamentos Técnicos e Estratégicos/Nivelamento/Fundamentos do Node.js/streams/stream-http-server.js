import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const number = parseInt(chunk.toString())
        const result = number * -1
        this.push(result.toString())

        console.log(result.toString())

        callback(null, Buffer.from(result.toString()))
    }
}

const server = http.createServer(async (req, res) => {

    const buffers = []
    // req.on('data', (chunk) => {
    //     buffers.push(chunk)
    // })
    for await(const chunk of req) {
        buffers.push(chunk)
    }

    const fullStreamContent = Buffer.concat(buffers).toString()
    console.log(fullStreamContent)

    return res.end(fullStreamContent)

    // return req.pipe(new InverseNumberStream()).pipe(res)
});


server.listen(3334)
