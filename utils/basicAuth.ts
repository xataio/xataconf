import initializeBasicAuth from 'nextjs-basic-auth'
const users = [
    { user: 'yeahhh', password: 'sarar0cks!' },
]
export const basicAuthCheck = initializeBasicAuth({
    users: users
})