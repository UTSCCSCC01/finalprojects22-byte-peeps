
import HTTP from '../../../utils/http';
const LOGIN_URL = ''
export function login(username: string, password: string) {
    return HTTP.post(LOGIN_URL, JSON.stringify({ username, password }), {
        headers: { 'Content-Type': 'application/json' },

    })
}