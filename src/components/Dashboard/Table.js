import React from 'react';
import moment from "moment";

const Table = ({ astronauts, handleEdit, handleDelete }) => {
    moment.locale("fr");

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Date Création</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {astronauts.length > 0 ? (
              astronauts.map((astronaut) => (
              <tr key={astronaut.ID}>
                <td>{astronaut.ID}</td>
                <td>{astronaut.firstName}</td>
                <td>{astronaut.lastName}</td>
                <td>{astronaut.email}</td>
                <td>{moment(astronaut.CreatedAt).format(`HH:mm [le] D MMMM YYYY`)} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(astronaut)}
                    className="button muted-button"
                  >
                    Modifier
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(astronaut.ID)}
                    className="button muted-button"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>Aucun astronautes</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
