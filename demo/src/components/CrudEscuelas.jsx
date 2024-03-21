import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

export const CrudEscuelas = () => {
    const apiUrl = 'https://api.escuelajs.co/api/v1/users/';

    const [escuelas, setEscuelas] = useState([]);
    const [nombreEscuela, setNombreEscuela] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);

    const toggleModal = () => {
        setShowModal(!showModal);
        setEditingUserId(null); // Reseteamos el ID de edición al cerrar el modal
    };

    const resetForm = () => {
        setNombreEscuela('');
        setEmail('');
        setPassword('');
        setAvatarUrl('');
    };

    const postEscuela = async () => {
        try {
            const data = {
                name: nombreEscuela,
                email,
                password,
                avatar: avatarUrl
            };

            await axios.post(apiUrl, data);

            resetForm();
            toggleModal();
            getEscuelas();
            Swal.fire('Éxito', 'Escuela agregada correctamente', 'success');
        } catch (error) {
            console.error('Error al agregar la escuela:', error);
            Swal.fire('Error', 'Ocurrió un error al agregar la escuela', 'error');
        }
    };

    const putEscuela = async () => {
        try {
            const data = {
                name: nombreEscuela,
                email
            };

            await axios.put(`${apiUrl}${editingUserId}`, data);

            resetForm();
            toggleModal();
            getEscuelas();
            Swal.fire('Éxito', 'Escuela actualizada correctamente', 'success');
        } catch (error) {
            console.error('Error al actualizar la escuela:', error);
            Swal.fire('Error', 'Ocurrió un error al actualizar la escuela', 'error');
        }
    };

    const deleteEscuela = async (id) => {
        try {
            await axios.delete(`${apiUrl}${id}`);

            getEscuelas();
            Swal.fire('Éxito', 'Escuela eliminada correctamente', 'success');
        } catch (error) {
            console.error('Error al eliminar la escuela:', error);
            Swal.fire('Error', 'Ocurrió un error al eliminar la escuela', 'error');
        }
    };

    const getEscuelas = async () => {
        try {
            const response = await axios.get(apiUrl);
            setEscuelas(response.data);
        } catch (error) {
            console.error('Error al obtener las escuelas:', error);
        }
    };

    useEffect(() => {
        getEscuelas();
    }, []);

    const handleEditClick = (id, userName, userEmail) => {
        setEditingUserId(id);
        setNombreEscuela(userName);
        setEmail(userEmail);
        setShowModal(true);
    };
    return (
        <>
            <div className='App'>
                <div className="container mt-5">
                    <h2>CRUD de Escuelas</h2>
                    <button className="btn btn-primary mb-3" onClick={() => { toggleModal(); resetForm(); }}>Agregar Escuela</button>

                    <div className="row">
                        {escuelas.map((escuela) => (
                            <div className="col-md-4 mb-4" key={escuela._id}>
                                <div className="card">
                                    <img src={escuela.avatar} className="card-img-top" alt="Avatar" />
                                    <div className="card-body">
                                        <h5 className="card-title">{escuela.name}</h5>
                                        <p className="card-text"><strong>Email:</strong> {escuela.email}</p>
                                        <p className="card-text"><strong>Rol:</strong> {escuela.role}</p>
                                        <button className="btn btn-warning mr-2" onClick={() => handleEditClick(escuela.id, escuela.name, escuela.email)}>Editar</button>
                                        <button className="btn btn-danger" onClick={() => deleteEscuela(escuela.id)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{editingUserId ? 'Editar Escuela' : 'Agregar Escuela'}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggleModal}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="nombreEscuela">Nombre de la escuela</label>
                                            <input type="text" className="form-control" id="nombreEscuela" value={nombreEscuela} onChange={(e) => setNombreEscuela(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Contraseña</label>
                                            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="avatarUrl">URL del Avatar</label>
                                            <input type="text" className="form-control" id="avatarUrl" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={toggleModal}>Cancelar</button>
                                    <button type="button" className="btn btn-primary" onClick={editingUserId ? putEscuela : postEscuela}>{editingUserId ? 'Guardar Cambios' : 'Agregar'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`modal-backdrop fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>
                </div>
            </div>
        </>
    )
}
