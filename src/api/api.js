const BASE_URL = "http://localhost:3000/todos";

export async function getRequest() {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("");
    const data = await res.json();
    return data.sort((a, b) => b.lastUpdated - a.lastUpdated);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function postRequest(payload) {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("");
    const data = await res.json();
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function removeRequest(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("");
    const data = await res.json();
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function updateRequest(id, payload) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("");
    const data = await res.json();
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}
