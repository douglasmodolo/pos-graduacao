import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'


export async function transactionsRoutes(app: FastifyInstance) {
    
    app.get('/', 
        { 
            preHandler: [checkSessionIdExists] 
        }, 
        async (request) => {
            const { sessionId } = request.cookies

            const transactions = await knex('transactions')
                .where('session_id', sessionId)
                .orderBy('created_at', 'desc')
                .select('*')
            
            return { transactions }
        }
    )

    app.get('/:id', 
        { 
            preHandler: [checkSessionIdExists] 
        }, 
        async (request) => {
            
            const getTransactionParamSchema = z.object({
                id: z.string().uuid()            
            })
            
            const { id } = getTransactionParamSchema.parse(request.params)
            
            const { sessionId } = request.cookies

            const transaction = await knex('transactions')
                .where({
                    id,
                    session_id: sessionId
                })
                .first()

            return { transaction }
        }
    )

    app.get('/summary', 
        { 
            preHandler: [checkSessionIdExists] 
        }, 
        async (request) => {
        
            const { sessionId } = request.cookies

            const summary = await knex('transactions')
                .where('session_id', sessionId)
                .sum('amount', { as: 'amount' })
                .first()
        
            return { summary }
        }
    )

    app.post('/', async (request, reply) => {    
        // { title, amount, type: credit/debit }
        
        const createTransactionBodySchema = z.object({
            title: z.string().nonempty(),
            amount: z.number(),
            type: z.enum(['credit','debit'])
        })

        const body = createTransactionBodySchema.parse(request.body)

        let sessionId = request.cookies.sessionId

        if (!sessionId) {
            sessionId = crypto.randomUUID()

            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 7 days
            })
        }

        await knex('transactions')
            .insert({
                id: crypto.randomUUID(),
                title: body.title,
                amount: body.type == 'credit' ? body.amount : body.amount * -1,
                session_id: sessionId
            })
    
        return reply.status(201).send()
    })
}