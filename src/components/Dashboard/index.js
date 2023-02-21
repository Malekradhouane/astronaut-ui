import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import api from "../../api";

const Dashboard = () => {
  const [astronauts, setAstronauts] = useState([]);
  const [selectedAstronaut, setSelectedAstronaut] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
    const fetchAstronaut = () => {
        api.get('/astronauts').then((res) => {
           setAstronauts(res.data)
       })

    }
    useEffect(() => {
        fetchAstronaut()
    }, [astronauts]);


  const handleEdit = selectedAstronaut => {
    setSelectedAstronaut(selectedAstronaut);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
          api.delete(`/astronauts/${id}`).then(
              fetchAstronaut()
          )
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${selectedAstronaut.firstName} ${selectedAstronaut.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
          />
          <Table
              astronauts={astronauts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
            astronauts={astronauts}
            setAstronauts={setAstronauts}
            setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
            astronauts={astronauts}
            selectedAstronaut={selectedAstronaut}
            setAstronauts={setAstronauts}
            setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
