const BASE = 'http://localhost:4000';

export async function getJson(path){
  const res = await fetch(BASE + path);
  return res.json();
}

export async function getJsonAuth(path, token){
  const res = await fetch(BASE + path, { headers: { Authorization: `Bearer ${token}` }});
  return res.json();
}

export async function postJsonAuth(path, body, token){
  const res = await fetch(BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization:`Bearer ${token}` },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function putJsonAuth(path, body, token){
  const res = await fetch(BASE + path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization:`Bearer ${token}` },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function deleteAuth(path, token){
  const res = await fetch(BASE + path, { method:'DELETE', headers:{ Authorization:`Bearer ${token}` }});
  return res.json();
}

// For file upload
export async function postFormAuth(path, formData, token){
  const res = await fetch(BASE + path, { method:'POST', headers:{ Authorization:`Bearer ${token}` }, body: formData });
  return res.json();
}
