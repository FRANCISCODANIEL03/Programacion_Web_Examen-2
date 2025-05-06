import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLibroContext } from '../context/LibroContext';

export function Form() {

    const {
        addLibro, addGenero, generos, editIndex, setEditIndex, libros
    } = useLibroContext();

    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [genero, setGenero] = useState('');
    const [año, setAño] = useState('');
    const [leido, setLeido] = useState(false);
    const [showNewGeneroInput, setShowNewGeneroInput] = useState(false);
    const [newGenero, setNewGenero] = useState('');
    
    useEffect(() => {
        if (editIndex !== null) {
            const libro = libros[editIndex];
            setTitulo(libro.titulo);
            setAutor(libro.autor);
            setGenero(libro.genero);
            setAño(libro.año);
        }
    }, [editIndex]);
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!titulo.trim() || !autor.trim() || !genero.trim() || !año.trim()) {
            toast.error('Todos los campos son obligatorios');
            return;
        }
    
        addLibro({ titulo, autor, genero, año, leido });
        setTitulo('');
        setAutor('');
        setGenero('');
        setAño('');
        setLeido(false);
    };
    

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 bg-indigo-100 m-8 p-4 rounded-lg text-xl font-semibold text-center'>
            <label className='text-2xl'>Ingresa el titulo del video</label>
            <input
                className='text-center border-b-4 border-indigo-500 outline-none'
                type="text"
                placeholder="El principito"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />
            <label>Autor</label>
            <input
                className='text-center border-b-4 border-indigo-500 outline-none'
                type="text"
                placeholder="Autor del libro"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
            />

            <label>Año de publicacion</label>
            <input
                className='text-center border-b-4 border-indigo-500 outline-none'
                type="text"
                placeholder="Año de publicacion"
                value={año}
                onChange={(e) => setAño(e.target.value)}
            />

            <label>Genero</label>
            <div className="flex justify-center items-center gap-2">
                <select className='border-b-4 border-indigo-500 outline-none text-center' value={genero} onChange={(e) => setGenero(e.target.value)}>
                    <option value="">Selecciona un genero</option>
                    {generos.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
                </select>
                <button type="button" onClick={() => setShowNewGeneroInput(true)} className='text-indigo-500 text-2xl' title="Agregar nuevo genero">
                    <i className="bi bi-plus-circle"></i>
                </button>
            </div>


            {showNewGeneroInput && (
                <div className='flex justify-center items-center gap-2'>
                    <input
                        className='border-b-4 border-indigo-500 outline-none text-center'
                        type="text"
                        placeholder="Nuevo Genero"
                        value={newGenero}
                        onChange={(e) => setNewGenero(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => {
                            if (!newGenero.trim()) {
                                toast.error('El genero no puede estar vacio');
                                return;
                            }
                            addGenero(newGenero);
                            setShowNewGeneroInput(false);
                            setNewGenero('');
                            toast.success('Genero agregado exitosamente');
                        }}
                        className='text-green-600 text-2xl'
                        title="Confirmar"
                    >
                        <i className="bi bi-plus-circle-fill"></i>
                    </button>
                    <button type="button" onClick={() => setShowNewGeneroInput(false)} className='text-red-600 text-2xl' title="Cancelar">
                        <i className="bi bi-x-circle-fill"></i>
                    </button>
                </div>
            )}
            <button className='bg-indigo-500 text-white mt-4 p-1 rounded'>Guardar</button>
            {editIndex !== null && (
                <button
                    type="button"
                    onClick={() => {
                        setEditIndex(null);
                        setTitulo('');
                        setAutor('');
                        setGenero('');
                        setAño('');
                    }}
                    className="bg-red-400 text-white mt-2 p-1 rounded"
                >
                    Cancelar edición
                </button>
            )}

        </form>
    );
}
