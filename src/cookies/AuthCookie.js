import Cookies from 'js-cookie';

export const setAllCookies = (accessToken, refreshToken, user, expires = 7, path = '/') => {
    Cookies.set('accessToken', accessToken, { expires, path });
    Cookies.set('refreshToken', refreshToken, { expires, path });
    Cookies.set('user', JSON.stringify(user), { expires, path });
};

export const getCookie = (key) => {
    return Cookies.get(key);
};

export const getUserCookie = () => {
    const user = Cookies.get('user');
    return user ? JSON.parse(user) : null;
};

export const getAccessToken = () => {
    return Cookies.get('accessToken');
};

export const getRefreshToken = () => {
    return Cookies.get('refreshToken');
};

export const deleteAllCookies = () => {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });
    Cookies.remove('user', { path: '/' });
};