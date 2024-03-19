import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export const Crud = () => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.escuelajs.co/api/v1/users');
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al cargar los datos. Por favor, inténtalo de nuevo más tarde.',
                });
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div className="alert alert-info">Cargando...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">Error: {error.message}</div>;
    }
    return (
        <>
            <div>
                <h1 className="mb-4">Alumnos Escuela Raúl Zaldivar</h1>
                <div className="row">
                    {data.map(item => (
                        <div key={item.id} className="col-md-4 mb-3">
                            <div className="card">
                                <img src={item.avatar} className="card-img-top" alt="Avatar" />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.email}</p>
                                    <p className="card-text">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
