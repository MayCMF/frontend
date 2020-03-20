import { reloadAuthorized } from './Authorized'; // use localStorage to store the authority info, which might be sent from server in actual project.

export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('MayCMFUser') : str; // authorityString could be admin, "admin", ["admin"]

  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  }
console.log(authority)
  if (!authority) {
    return ['admin'];
  }

  return authority;
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('MayCMFUser', JSON.stringify(proAuthority)); // auto reload

  reloadAuthorized();
}
