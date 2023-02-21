import React, { useState } from 'react';
import Swal from 'sweetalert2';
import api from '../../api';

const Add = ({ astronauts, setAstronauts, setIsAdding }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');


  const handleAdd = e => {
    e.preventDefault();

    if (!firstName || !lastName || !email ) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newAstronaut = {
      firstName,
      lastName,
      email,
    };

    api.post('/astronauts', newAstronaut).then( api.get('/astronauts').then((res) => {
        setAstronauts(res.data)
        setIsAdding(false);

    }));;

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${firstName} ${lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Ajouter Astronaut</h1>
        <label htmlFor="firstName">Prémon</label>
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
          <input type="submit" value="Ajouter" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Annuler"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
