import React, { useState } from 'react';
import Swal from 'sweetalert2';
import api from "../../api";

const Edit = ({ astronauts, selectedAstronaut, setAstronauts, setIsEditing }) => {
  const [firstName, setFirstName] = useState(selectedAstronaut.firstName);
  const [lastName, setLastName] = useState(selectedAstronaut.lastName);
  const [email, setEmail] = useState(selectedAstronaut.email);

  const handleUpdate = e => {
    e.preventDefault();

    if (!firstName || !lastName || !email ) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const astronaut = {
      firstName,
      lastName,
      email,
    };

      api.patch(`/astronauts/${selectedAstronaut.ID}`, astronaut).then( api.get('/astronauts').then((res) => {
        setAstronauts(res.data)
          setIsEditing(false);

      }));

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${astronaut.firstName} ${astronaut.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Modifier Astronaute</h1>
        <label htmlFor="firstName">Prénom</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Nom</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Modifier" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Annuler"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
