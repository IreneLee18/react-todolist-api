import { API_login, API_logout, API_register, API_todo } from "./ApiUrl";

const headers = { "Content-Type": "application/json" };

export const getAPI_login = (body) => {
  return fetch(API_login, {
    method: "POST",
    headers,
    body,
  });
};

export const getAPI_logout = (token) => {
  return fetch(API_logout, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export const getAPI_register = (body) => {
  return fetch(API_register, {
    method: "POST",
    headers,
    body,
  });
};

export const getAPI_todo = (token) => {
  return fetch(API_todo, {
    method:"GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export const addAPI_todo = (token, body) => {
  return fetch(API_todo, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body,
  });
};

export const deleteAPI_todo = (id, token) => {
  return fetch(`${API_todo}/${id}`, {
    method:"DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export const toggleAPI_todo = (id, token) => {
  return fetch(`${API_todo}/${id}/toggle`, {
    method:"PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};