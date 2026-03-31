const BASE_URL = "https://realestate-workdo.onrender.com";

export async function getJson(path){
  const res = await fetch(BASE_URL + path);
  return res.json();
}

export async function getJsonAuth(path, token){
  const res = await fetch(BASE_URL + path, { headers: { Authorization: `Bearer ${token}` }});
  return res.json();
}

export async function postJsonAuth(path, body, token){
  const res = await fetch(BASE_URL + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization:`Bearer ${token}` },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function putJsonAuth(path, body, token){
  const res = await fetch(BASE_URL + path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization:`Bearer ${token}` },
    body: JSON.stringify(body)
  });
  return res.json();
}

export async function deleteAuth(path, token){
  const res = await fetch(BASE_URL + path, { method:'DELETE', headers:{ Authorization:`Bearer ${token}` }});
  return res.json();
}

// For file upload
export async function postFormAuth(path, formData, token){
  const res = await fetch(BASE_URL + path, { method:'POST', headers:{ Authorization:`Bearer ${token}` }, body: formData });
  return res.json();
}
