import fastify from 'fastify'
//import crypto from 'node:crypto'
import { transactionsRoutes } from './routes/transactions'
import cookie from '@fastify/cookie'

export const app = fastify()

app.register(cookie)

app.register(transactionsRoutes, {
    prefix: 'transactions'
})