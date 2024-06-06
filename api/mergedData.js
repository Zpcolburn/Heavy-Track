import { getJobSiteEquipment, getSingleJobSite } from './jobsiteData';
import { getSingleEquipment, deleteEquipment } from './equipData';

const viewEquipmentDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleEquipment(bookFirebaseKey)
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
      resolve({ ...jobsiteObject, books: jobsiteEquipArray });
    }).catch((error) => reject(error));
});

const deleteJobSiteEquipment = (jobsiteId) => new Promise((resolve, reject) => {
  getJobSiteEquipment(jobsiteId).then((equipArray) => {
    console.warn(equipArray, 'Author Books');
    const deleteEquipmentPromises = equipArray.map((equipment) => deleteEquipment(equipment.firebaseKey));

    Promise.all(deleteEquipmentPromises).then(() => {
      deleteEquipment(jobsiteId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export { viewEquipmentDetails, viewJobSiteDetails, deleteJobSiteEquipment };
