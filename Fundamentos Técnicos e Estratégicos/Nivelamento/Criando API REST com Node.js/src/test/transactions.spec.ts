import { it, beforeAll, afterAll, describe, expect, beforeEach } from 'vitest'

import request from 'supertest'
import { app } from '../app'
import { execSync } from 'child_process'

describe('Transactions', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()  
    })

    beforeEach(async () => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    })

    // Alterado para it pois faz parte da instrucao
    it('should be able to create a new transaction', async () => {
        
        await request(app.server)
            .post('/transactions')
            .send({
                title: 'New transaction',
                amount: 5000,
                type: 'credit'
            })
            .expect(201)
    })

    it('should be able to list all transactions', async () => {
        
        const createTransactionResponse = await request(app.server)
        .post('/transactions')
        .send({
            title: 'New transaction',
            amount: 5000,
            type: 'credit'
        })

        const cookies = createTransactionResponse.get('Set-Cookie') 

        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies?.join(';') || '')
            .expect(200)

        expect(listTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New transaction',
                amount: 5000,
            })
        ])
    })
})