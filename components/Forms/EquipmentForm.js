import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getAllJobSites } from '../../api/jobsiteData';
import { createEquipment, updateEquipment } from '../../api/equipData';

const initialState = {
  image: '',
  name: '',
  size: '',
  jobsite_id: '',
  operable: false,
};

function EquipmentForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [jobsites, setJobSites] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAllJobSites(user.uid).then(setJobSites);

    if (obj?.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formInput, uid: user.uid };

    if (formInput.jobsite_id === 'laydown_yard') {
      payload.jobsite_id = null;
    }

    if (obj.firebaseKey) {
      updateEquipment(payload).then(() => router.push('/equipment'));
    } else {
      createEquipment(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateEquipment(patchPayload).then(() => {
          router.push('/equipment');
        });
      });
    }
  };

  const buttonStyle = {
    backgroundColor: '#a2c4f5',
    color: '#333',
    borderColor: '#ccc',
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Equipment</h2>

      {/* NAME INPUT */}
      <FloatingLabel controlId="floatingInput1" label="Equipment Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT */}
      <FloatingLabel controlId="floatingInput2" label="Equipment Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* JOBSITE SELECT */}
      <FloatingLabel controlId="floatingSelect1" label="Job Site">
        <Form.Select
          aria-label="Job Site"
          name="jobsite_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.jobsite_id}
          required
        >
          <option value="">Select a Job Site</option>
          {jobsites.map((jobsite) => (
            <option key={jobsite.firebaseKey} value={jobsite.firebaseKey}>
              {jobsite.name}
            </option>
          ))}
          <option value="laydown_yard">Laydown Yard</option>
        </Form.Select>
      </FloatingLabel>

      {/* SIZE SELECT */}
      <FloatingLabel controlId="floatingSelect2" label="Equipment Size">
        <Form.Select
          aria-label="Size"
          name="size"
          onChange={handleChange}
          className="mb-3"
          value={formInput.size}
          required
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </Form.Select>
      </FloatingLabel>

      {/* OPERABLE SWITCH */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="operable"
        name="operable"
        label="Operable?"
        checked={formInput.operable}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            operable: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON */}
      <Button type="submit" style={buttonStyle}>{obj.firebaseKey ? 'Update' : 'Create'} Equipment</Button>
    </Form>
  );
}

EquipmentForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.string,
    jobsite_id: PropTypes.string,
    operable: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

EquipmentForm.defaultProps = {
  obj: initialState,
};

export default EquipmentForm;
