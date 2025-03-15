import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'

const app = fastify()

app.get('/hello', async () => {
    // const transaction = await knex('transactions').insert({
    //     id: crypto.randomUUID(),
    //     title: 'Transações de teste',
    //     amount: 1000,
    // }).returning('*')

    const transaction = await knex('transactions')
        .where('amount', 2000)
        .select('*') 

    return transaction
})


app.listen({
    port: 3333
}).then(() => {
    console.log('Server is running on port 3333')
})