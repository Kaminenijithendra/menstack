

import jwtDecode from 'jwt-decode';

export const getUserNameFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decoded = jwtDecode(token);
        return decoded.userName;
    }
    return null;
};
