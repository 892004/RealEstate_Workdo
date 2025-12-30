// src/utils/auth.js
export function saveToken(token){
  localStorage.setItem('token', token);
}
export function getToken(){
  return localStorage.getItem('token');
}
export function removeToken(){
  localStorage.removeItem('token');
}
export function isAdmin(){
  const t = getToken();
  if(!t) return false;
  try {
    const payload = JSON.parse(atob(t.split('.')[1]));
    return payload.role && payload.role === 'admin';
  } catch(e){
    return false;
  }
}
