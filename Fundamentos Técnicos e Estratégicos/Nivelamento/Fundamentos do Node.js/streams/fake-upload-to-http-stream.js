import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1
    
    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 5) {
                this.push(null)
            } else {
                const buf = Buffer.from(i.toString(), 'utf-8')
                this.push(buf)
            }
        }, 1000)
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half'
}).then(async (res) => {
    for await (const chunk of res.body) {
        console.log(chunk.toString())
    }
})