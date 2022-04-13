export default class TService {
    getJsonHeader() {
        return { 'Content-type': 'application/json' };
    }
    getAuthorizationHeader(auth) {
        return {
            'Authorization': auth,
        };
    }
    getJsonAndAuthHeader() {
        return { ...this.getJsonHeader, ...this.getAuthorizationHeader }
    }
}