// TODO: Implement token and add to requests
export function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.authdata) {
    return { 'Authorization': 'Basic ' + user.authdata};
  } else {
    return {};
  }
}