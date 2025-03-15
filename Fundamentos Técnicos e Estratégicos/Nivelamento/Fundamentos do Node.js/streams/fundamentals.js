import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1
    
    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null)
            } else {
                const buf = Buffer.from(i.toString(), 'utf-8')
                this.push(buf)
            }
        }, 100)
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const number = parseInt(chunk.toString())
        const result = number * -1
        this.push(result.toString())
        callback(null, Buffer.from(result.toString()))
    }
}

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        const number = parseInt(chunk.toString())
        const result = number * 10
        console.log(result)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())