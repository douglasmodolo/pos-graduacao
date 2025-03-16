import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'


export async function transactionsRoutes(app: FastifyInstance) {
    
    app.get('/', async () => {
        const transactions = await knex('transactions').select('*')
        
        return {
            transactions
        }
    })

    app.get('/:id', async (request) => {
        const getTransactionParamSchema = z.object({
            id: z.string().uuid()            
        })

        const params = getTransactionParamSchema.parse(request.params)

        const transaction = await knex('transactions')
            .where('id', params.id)
            .first()

        return {
            transaction
        }
    })

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