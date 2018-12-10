import CryptoJS from 'crypto-js';
import axios from 'axios';

const API = 'http://gateway.marvel.com/v1/public';
const publicKey = 'fd77085b5fa494a55ca4c0551ba11b71';
const privateKey = '750f0fda3cab31bb74cfaa18c1ccfcf4464cfe04';
const limit = 10;
const offset = 0;

const authenticationParams = (pageNumber) => {
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

    return {
        ts,
        hash,
        apikey: publicKey,
        limit,
        offset: pageNumber ? (pageNumber - 1) * limit : offset
    };
};

const getCharacters = (pageNumber) => {
    const params = authenticationParams(pageNumber);
    return axios.get(`${API}/characters`, {params});
};

export {getCharacters};