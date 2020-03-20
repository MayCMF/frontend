const accessTokenKey = 'access_token';

export default class store {
  // Set access token
  static setAccessToken(token) {
    sessionStorage.setItem(accessTokenKey, JSON.stringify(token));
    var base64Url = token.access_token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    localStorage.setItem('MayCMFUser', JSON.parse(jsonPayload).sub);
  }

  // Get access token
  static getAccessToken() {
    const token = sessionStorage.getItem(accessTokenKey);
    if (!token || token === '') {
      return null;
    }
    return JSON.parse(token);
  }

  // Clear access token
  static clearAccessToken() {
    sessionStorage.removeItem(accessTokenKey);
    localStorage.removeItem('MayCMFUser');
  }
}
