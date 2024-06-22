import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getEquipment = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/equipment.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteEquipment = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/equipment/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleEquipment = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/equipment/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createEquipment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/equipment.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateEquipment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/equipment/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getEquipmentJobSite = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/equipment.json?orderBy="jobsite_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getEquipment,
  createEquipment,
  deleteEquipment,
  getSingleEquipment,
  updateEquipment,
  getEquipmentJobSite,
};
