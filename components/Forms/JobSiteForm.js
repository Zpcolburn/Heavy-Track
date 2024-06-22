import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getEquipment, updateEquipment } from '../../api/equipData';
import { createJobSite, updateJobSite, getJobSiteEquipment } from '../../api/jobsiteData';

const initialState = {
  image: '',
  name: '',
  foreman: '',
  notes: '',
  location: '',
  equipment: [],
};

function JobSiteForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [equipments, setEquipments] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getEquipment(user.uid).then(setEquipments);

    if (obj.firebaseKey) {
      setFormInput({ ...obj, equipment: obj.equipment || [] });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    const {
      name, type, checked, value,
    } = e.target;
    if (type === 'checkbox') {
      const currentEquipment = [...formInput.equipment];
      if (checked) {
        currentEquipment.push(value);
      } else {
        const index = currentEquipment.indexOf(value);
        currentEquipment.splice(index, 1);
      }
      setFormInput((prevState) => ({
        ...prevState,
        equipment: currentEquipment,
      }));
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formInput, uid: user.uid };

    if (obj.firebaseKey) {
      const currentEquipments = await getJobSiteEquipment(obj.firebaseKey);

      const equipmentUpdates = currentEquipments.map((equipment) => {
        if (formInput.equipment.includes(equipment.firebaseKey)) {
          return updateEquipment({ ...equipment, jobsite_id: obj.firebaseKey });
        }
        return updateEquipment({ ...equipment, jobsite_id: null });
      });

      const newEquipment = formInput.equipment.filter((equipId) => !currentEquipments.some((equip) => equip.firebaseKey === equipId));

      const newEquipmentUpdates = newEquipment.map((equipId) => {
        const equip = equipments.find(() => e.firebaseKey === equipId);
        return updateEquipment({ ...equip, jobsite_id: obj.firebaseKey });
      });

      await Promise.all([...equipmentUpdates, ...newEquipmentUpdates]);
    } else {
      const { name } = await createJobSite(payload);
      const patchPayload = { firebaseKey: name };
      await updateJobSite(patchPayload);

      const equipmentUpdates = formInput.equipment.map((equipId) => {
        const equip = equipments.find(() => e.firebaseKey === equipId);
        return updateEquipment({ ...equip, jobsite_id: name });
      });
      await Promise.all(equipmentUpdates);
    }
    router.push('/');
  };

  const buttonStyle = {
    backgroundColor: '#a2c4f5',
    color: '#333',
    borderColor: '#ccc',
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Job Site</h2>

      <FloatingLabel controlId="floatingInput1" label="Job Site Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Job Site Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect1" label="Assign a Foreman">
        <Form.Select
          aria-label="Foreman"
          name="foreman"
          onChange={handleChange}
          className="mb-3"
          value={formInput.foreman}
          required
        >
          <option value="" disabled>Assign a Foreman</option>
          <option value="John">John</option>
          <option value="Brian">Brian</option>
          <option value="Mike">Mike</option>
          <option value="Tracy">Tracy</option>
          <option value="Garry">Garry</option>
          <option value="Aja">Aja</option>
          <option value="Sarah">Sarah</option>
          <option value="Trevor">Trevor</option>
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Job Site Location" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a Location"
          name="location"
          value={formInput.location}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <div>
        <b>Equipment: </b>
        {equipments.map((equipment) => (
          <label key={equipment.firebaseKey} className="d-block">
            <input
              type="checkbox"
              value={equipment.firebaseKey}
              onChange={handleChange}
              checked={formInput.equipment.includes(equipment.firebaseKey)}
            />
            {equipment.name}
          </label>
        ))}
      </div>

      <Button type="submit" style={buttonStyle}>{obj.firebaseKey ? 'Update' : 'Create'} Job Site</Button>
    </Form>
  );
}

JobSiteForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    foreman: PropTypes.string,
    notes: PropTypes.string,
    location: PropTypes.string,
    equipment: PropTypes.arrayOf(PropTypes.string),
    firebaseKey: PropTypes.string,
  }),
};

JobSiteForm.defaultProps = {
  obj: initialState,
};

export default JobSiteForm;

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import { Button } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
// import { getEquipment, updateEquipment } from '../../api/equipData';
// import { createJobSite, getJobSiteEquipment, updateJobSite } from '../../api/jobsiteData';

// const initialState = {
//   image: '',
//   name: '',
//   foreman: '',
//   notes: '',
//   location: '',
//   equipment: [],
// };

// function JobSiteForm({ obj }) {
//   const [formInput, setFormInput] = useState(initialState);
//   const [equipments, setEquipments] = useState([]);
//   const router = useRouter();
//   const { user } = useAuth();

//   useEffect(() => {
//     getEquipment(user.uid).then(setEquipments);
//     if (obj.firebaseKey) {
//       setFormInput({ ...obj, equipment: obj.equipment || [] });
//     }
//   }, [obj, user]);

//   const handleChange = (e) => {
//     const {
//       name, type, checked, value,
//     } = e.target;
//     if (type === 'checkbox') {
//       const currentEquipment = [...formInput.equipment];
//       if (checked) {
//         currentEquipment.push(value);
//       } else {
//         const index = currentEquipment.indexOf(value);
//         currentEquipment.splice(index, 1);
//       }
//       setFormInput((prevState) => ({
//         ...prevState,
//         equipment: currentEquipment,
//       }));
//     } else {
//       setFormInput((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const payload = { ...formInput, uid: user.uid };

//     if (obj.firebaseKey) {
//       updateJobSite(payload).then(() => {
//         getJobSiteEquipment(obj.firebaseKey).then((equip) => {
//           // Update all equipment associated with the jobsite
//           const updatePromises = equipments.map((equipment) => {
//             // eslint-disable-next-line no-param-reassign
//             equip.jobsite_id = payload.firebaseKey;
//             return updateEquipment(equipment);
//           });

//           Promise.all(updatePromises).then(() => {
//             router.push('/');
//           });
//         });
//       });
//     } else {
//       createJobSite(payload).then(({ name }) => {
//         const patchPayload = { firebaseKey: name };
//         updateJobSite(patchPayload).then(() => {
//           getJobSiteEquipment(name).then((equips) => {
//             // Update all equipment associated with the new jobsite
//             const updatePromises = equipments.map((equipment) => {
//               // eslint-disable-next-line no-param-reassign
//               equips.jobsite_id = name;
//               return updateEquipment(equipment);
//             });

//             Promise.all(updatePromises).then(() => {
//               router.push('/');
//             });
//           });
//         });
//       });
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Job Site</h2>

//       <FloatingLabel controlId="floatingInput1" label="Job Site Name" className="mb-3">
//         <Form.Control
//           type="text"
//           placeholder="Enter a name"
//           name="name"
//           value={formInput.name}
//           onChange={handleChange}
//           required
//         />
//       </FloatingLabel>

//       <FloatingLabel controlId="floatingInput2" label="Job Site Image" className="mb-3">
//         <Form.Control
//           type="url"
//           placeholder="Enter an image url"
//           name="image"
//           value={formInput.image}
//           onChange={handleChange}
//           required
//         />
//       </FloatingLabel>

//       <FloatingLabel controlId="floatingSelect1" label="Assign a Foreman">
//         <Form.Select
//           aria-label="Foreman"
//           name="foreman"
//           onChange={handleChange}
//           className="mb-3"
//           value={formInput.foreman}
//           required
//         >
//           <option value="" disabled>Assign a Foreman</option>
//           <option value="John">John</option>
//           <option value="Brian">Brian</option>
//           <option value="Mike">Mike</option>
//           <option value="Tracy">Tracy</option>
//           <option value="Garry">Garry</option>
//           <option value="Aja">Aja</option>
//           <option value="Sarah">Sarah</option>
//           <option value="Trevor">Trevor</option>
//         </Form.Select>
//       </FloatingLabel>

//       <FloatingLabel controlId="floatingInput3" label="Job Site Location" className="mb-3">
//         <Form.Control
//           type="text"
//           placeholder="Enter a Location"
//           name="location"
//           value={formInput.location}
//           onChange={handleChange}
//           required
//         />
//       </FloatingLabel>

//       <div>
//         <b>Equipment: </b>
//         {equipments.map((equipment) => (
//           <label key={equipment.firebaseKey} className="d-block">
//             <input
//               type="checkbox"
//               value={equipment.firebaseKey}
//               onChange={handleChange}
//               checked={formInput.equipment.includes(equipment.firebaseKey)}
//             />
//             {equipment.name}
//           </label>
//         ))}
//       </div>

//       <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Job Site</Button>
//     </Form>
//   );
// }

// JobSiteForm.propTypes = {
//   obj: PropTypes.shape({
//     image: PropTypes.string,
//     name: PropTypes.string,
//     foreman: PropTypes.string,
//     notes: PropTypes.string,
//     location: PropTypes.string,
//     equipment: PropTypes.arrayOf(PropTypes.string),
//     firebaseKey: PropTypes.string,
//   }),
// };

// JobSiteForm.defaultProps = {
//   obj: initialState,
// };

// export default JobSiteForm;

// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import { Button } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
// import { getEquipment } from '../../api/equipData';
// import { createJobSite, updateJobSite } from '../../api/jobsiteData';

// const initialState = {
//   image: '',
//   name: '',
//   foreman: '',
//   notes: '',
//   location: '',
//   equipment: [],
// };

// function JobSiteForm({ obj }) {
//   const [formInput, setFormInput] = useState(initialState);
//   const [equipments, setEquipments] = useState([]);
//   const router = useRouter();
//   const { user } = useAuth();

//   useEffect(() => {
//     getEquipment(user.uid).then(setEquipments);
//     if (obj.firebaseKey) {
//       setFormInput({ ...obj, equipment: obj.equipment || [] });
//     }
//   }, [obj, user]);

//   const handleChange = (e) => {
//     const {
//       name, type, checked, value,
//     } = e.target;
//     if (type === 'checkbox') {
//       const currentEquipment = [...formInput.equipment];
//       if (checked) {
//         currentEquipment.push(value);
//       } else {
//         const index = currentEquipment.indexOf(value);
//         currentEquipment.splice(index, 1);
//       }
//       setFormInput((prevState) => ({
//         ...prevState,
//         equipment: currentEquipment,
//       }));
//     } else {
//       setFormInput((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (obj.firebaseKey) {
//       updateJobSite(formInput).then(() => router.push('/'));
//     } else {
//       const payload = { ...formInput, uid: user.uid };
//       createJobSite(payload).then(({ name }) => {
//         const patchPayload = { firebaseKey: name };
//         updateJobSite(patchPayload).then(() => {
//           router.push('/');
//         });
//       });
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Job Site</h2>

//       <FloatingLabel controlId="floatingInput1" label="Job Site Name" className="mb-3">
//         <Form.Control
//           type="text"
//           placeholder="Enter a name"
//           name="name"
//           value={formInput.name}
//           onChange={handleChange}
//           required
//         />
//       </FloatingLabel>

//       <FloatingLabel controlId="floatingInput2" label="Job Site Image" className="mb-3">
//         <Form.Control
//           type="url"
//           placeholder="Enter an image url"
//           name="image"
//           value={formInput.image}
//           onChange={handleChange}
//           required
//         />
//       </FloatingLabel>

//       <FloatingLabel controlId="floatingSelect1" label="Assign a Foreman">
//         <Form.Select
//           aria-label="Foreman"
//           name="foreman"
//           onChange={handleChange}
//           className="mb-3"
//           value={formInput.foreman}
//           required
//         >
//           <option value="" disabled>Assign a Foreman</option>
//           <option value="John">John</option>
//           <option value="Brian">Brian</option>
//           <option value="Mike">Mike</option>
//           <option value="Tracy">Tracy</option>
//           <option value="Garry">Garry</option>
//           <option value="Aja">Aja</option>
//           <option value="Sarah">Sarah</option>
//           <option value="Trevor">Trevor</option>
//         </Form.Select>
//       </FloatingLabel>

//       <FloatingLabel controlId="floatingInput3" label="Job Site Location" className="mb-3">
//         <Form.Control
//           type="text"
//           placeholder="Enter a Location"
//           name="location"
//           value={formInput.location}
//           onChange={handleChange}
//           required
//         />
//       </FloatingLabel>

//       <div>
//         <b>Equipment: </b>
//         {equipments.map((equipment) => (
//           <label key={equipment.firebaseKey} className="d-block">
//             <input
//               type="checkbox"
//               value={equipment.firebaseKey}
//               onChange={handleChange}
//               checked={formInput.equipment.includes(equipment.firebaseKey)}
//             />
//             {equipment.name}
//           </label>
//         ))}
//       </div>

//       <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Job Site</Button>
//     </Form>
//   );
// }

// JobSiteForm.propTypes = {
//   obj: PropTypes.shape({
//     image: PropTypes.string,
//     name: PropTypes.string,
//     foreman: PropTypes.string,
//     notes: PropTypes.string,
//     location: PropTypes.string,
//     equipment: PropTypes.arrayOf(PropTypes.string),
//     firebaseKey: PropTypes.string,
//   }),
// };

// JobSiteForm.defaultProps = {
//   obj: initialState,
// };

// export default JobSiteForm;
