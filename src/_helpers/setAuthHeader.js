export function authHeader() {
    // return authorization header with jwt token
    const token = localStorage.getItem('accessToken');
    if (token) {
        return {Authorization: `Bearer ${token}`};
    } else {
        return {};
    }
}
