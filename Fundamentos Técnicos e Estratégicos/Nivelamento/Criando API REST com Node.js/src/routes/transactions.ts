import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'


export async function transactionsRoutes(app: FastifyInstance) {
    
    app.post('/', async (request, reply) => {    
        // { title, amount, type: credit/debit }
        
        const createTransactionBodySchema = z.object({
            title: z.string().nonempty(),
            amount: z.number(),
            type: z.enum(['credit','debit'])
        })

        const body = createTransactionBodySchema.parse(request.body)

        await knex('transactions')
            .insert({
                id: crypto.randomUUID(),
                title: body.title,
                amount: body.type == 'credit' ? body.amount : body.amount * -1,
            })
    
        return reply.status(201).send()
    })
}