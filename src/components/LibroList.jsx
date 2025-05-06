import React from 'react';
import { useLibroContext } from '../context/LibroContext';

export function LibroList() {
  const { filteredLibros, confirmDelete, searchText, setEditIndex, toggleLeido } = useLibroContext();

  const highlightMatch = (text) => {
    if (!searchText.trim()) return text;
    const regex = new RegExp(`(${searchText})`, 'ig');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i} className="bg-yellow-300">{part}</mark> : part
    );
  };

  if (filteredLibros.length === 0) {
    return <p className='text-center mt-4 text-gray-600'>No hay libros para mostrar</p>;
  }

  return (
    <div className='mx-8 mt-6 space-y-4'>
      {filteredLibros.map((libro, index) => (
        <div key={index} className={`bg-white shadow-md rounded-lg p-4 flex justify-between items-center border ${libro.leido==true ? 'border-green-500' : 'border-red-500'}`}>
          <div className='text-left'>
            <p className='text-lg font-bold'>{highlightMatch(libro.titulo)}</p>
            <p className='text-sm text-gray-600'>Autor: {highlightMatch(libro.autor)}</p>
            <p className='text-sm text-gray-600'>Género: {highlightMatch(libro.genero)}</p>
            <p className='text-sm text-gray-600'>Año: {highlightMatch(libro.año)}</p>
            <p className='text-sm text-gray-600'>Leido: {libro.leido==false ? 'No' : 'Si'}</p>
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => toggleLeido(index)}
              className={`text-sm px-2 py-1 rounded ${libro.leido ? 'bg-red-300' : 'bg-green-300'
                }`}
            >
              {libro.leido ? 'Marcar como no leído' : 'Marcar como leído'}
            </button>

            <button
              onClick={() => setEditIndex(index)}
              className='bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600'
            >
              Editar
            </button>

            <button
              onClick={() => confirmDelete(index)}
              className='text-red-600 text-xl'
              title="Eliminar Libro"
            >
              <i className="bi bi-trash3-fill"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
