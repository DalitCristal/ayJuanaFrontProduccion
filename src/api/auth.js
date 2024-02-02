import axios from "./axios.js";

export const registerRequest = (user) => axios.post(`/session/signup`, user);

export const loginRequest = (user) => axios.post(`/session/signin`, user);

export const verifyRequest = async () => axios.get(`/session/verify`);
