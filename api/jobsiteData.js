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

export {
  getAllJobSites,
  getSingleJobSite,
  getJobSiteEquipment,
};
