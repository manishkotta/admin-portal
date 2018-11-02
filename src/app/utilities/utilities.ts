export class Utilities {
    IsUserAuthentated() {
        let authToken = sessionStorage.getItem('auth_token');
        let isValid = sessionStorage.getItem('login_valid');

        if (!authToken && !isValid) {
            return false;
        }
        else if (authToken !== '' && isValid)
            return true;
        else
            return false;
    }
}