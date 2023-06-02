const { getUserFromEmail } = require('./userController')

describe('getUserFromEmail', () => {
    it('Should return test@test.com', async () => {
        const req = {
            body: {
                email: 'test@test.com'
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        const result = await getUserFromEmail(req, res)

        expect(result.email).toBe('test@test.com')
    });
});