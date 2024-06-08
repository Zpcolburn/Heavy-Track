import { getJobSiteEquipment, getSingleJobSite } from './jobsiteData';
import { getSingleEquipment, deleteEquipment } from './equipData';

const viewEquipmentDetails = (equipFirebaseKey) => new Promise((resolve, reject) => {
  getSingleEquipment(equipFirebaseKey)
    .then((equipObject) => {
      getSingleJobSite(equipObject.jobsite_id)
        .then((jobsiteObject) => {
          resolve({ jobsiteObject, ...equipObject });
        });
    }).catch((error) => reject(error));
});

const viewJobSiteDetails = (jobsiteFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleJobSite(jobsiteFirebaseKey), getJobSiteEquipment(jobsiteFirebaseKey)])
    .then(([jobsiteObject, jobsiteEquipArray]) => {
      resolve({ ...jobsiteObject, equipment: jobsiteEquipArray });
    }).catch((error) => reject(error));
});

const deleteJobSiteEquipment = (jobsiteId) => new Promise((resolve, reject) => {
  getJobSiteEquipment(jobsiteId).then((equipArray) => {
    console.warn(equipArray, 'Job Site Equipment');
    const deleteEquipmentPromises = equipArray.map((equipment) => deleteEquipment(equipment.firebaseKey));

    Promise.all(deleteEquipmentPromises).then(() => {
      deleteEquipment(jobsiteId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewEquipmentDetails, viewJobSiteDetails, deleteJobSiteEquipment };
