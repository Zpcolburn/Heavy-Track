import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllJobSites = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/jobsite.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleJobSite = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/jobsite/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getJobSiteEquipment = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/equipment.json?orderBy="jobsite_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createJobSite = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/jobsite.json`, {
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

const updateJobSite = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/jobsite/${payload.firebaseKey}.json`, {
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

const deleteJobSite = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/jobsite/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getAllJobSites,
  getSingleJobSite,
  getJobSiteEquipment,
  createJobSite,
  updateJobSite,
  deleteJobSite,
};
