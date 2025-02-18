import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectAllUsers, deleteUser, updateUser, getUsersStatus, getUsersError } from '../../store/userSlice';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import EditUserModal from './EditUserModal';
import './UserList.css';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const usersStatus = useSelector(getUsersStatus);
  const error = useSelector(getUsersError);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteUser(selectedUser._id));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const saveUser = (updatedUser) => {
    dispatch(updateUser({ id: selectedUser._id, userData: updatedUser }));
    setShowEditModal(false);
    setSelectedUser(null);
  };

  let content;

  if (usersStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (usersStatus === 'succeeded') {
    content = (
      <table className="user-table">
        <thead>
          <tr>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.filter(user => user.role !== 'admin').map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.address}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Modifier</button>
                <button onClick={() => handleDelete(user)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (usersStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h2>Gestion des Utilisateurs</h2>
      {content}
      <ConfirmDeleteModal
        show={showDeleteModal}
        handleClose={cancelDelete}
        handleConfirm={confirmDelete}
        user={selectedUser}
      />
      <EditUserModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        handleSave={saveUser}
        user={selectedUser}
      />
    </div>
  );
};

export default UserList;
