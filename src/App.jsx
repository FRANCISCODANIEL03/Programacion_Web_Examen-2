import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Form } from './components/Form';
import { LibroFilter } from './components/LibroFilter';
import { LibroList } from './components/LibroList';
import { LibroContext } from './context/LibroContext';
import useLocalStorage from './Hooks/useLocalstorage';

function App() {

  const [libros, setlibros] = useLocalStorage('libros', []);

  const [generos, setGeneros] = useLocalStorage('generos', ['Ciencia', 'Historia', 'Tecnologia'])

  const [searchText, setSearchText] = useState('');

  const [editIndex, setEditIndex] = useState(null);
  const [toggleLeidoFilter, setToggleLeidoFilter] = useState('');


  const addLibro = (libro) => {
    if (editIndex !== null) {
      const nuevosLibros = [...libros];
      nuevosLibros[editIndex] = libro;
      setlibros(nuevosLibros);
      setEditIndex(null);
      toast.success('Libro editado exitosamente');
    } else {
      setlibros(prev => [...prev, libro]);
      toast.success('Libro guardado exitosamente');
    }
  };

  const toggleLeido = (index) => {
    const newLibros = [...libros];
    newLibros[index].leido = !newLibros[index].leido;
    setlibros(newLibros);
  };

  const addGenero = (newGen) => {
    const cleanGen = newGen.trim();
    if (cleanGen && !generos.includes(cleanGen)) {
      setGeneros(prev => [...prev, cleanGen]);
    }
  };

  const confirmDelete = (index) => {
    toast(t => (
      <span className="flex flex-col gap-2">
        <p>¿Estás seguro de que deseas eliminar este libro?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setlibros(libros.filter((_, i) => i !== index));
              toast.dismiss(t.id);
              toast.success('Libro eliminado');
            }}
            className="bg-red-500 text-white px-2 py-1 rounded text-sm"
          >
            Eliminar
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 px-2 py-1 rounded text-sm"
          >
            Cancelar
          </button>
        </div>
      </span>
    ), { duration: 5000 });
  };

  const [searchField, setSearchField] = useState('titulo');

  const filteredLibros = libros.filter((libro) => {
    const text = searchText.toLowerCase();
    const fieldValue = (libro[searchField] ?? '').toString().toLowerCase();

    // Filtro por texto y por el campo
    const textMatch = fieldValue.includes(text);

    // Filtro por leídos/no leídos
    const leidoMatch = toggleLeidoFilter === 'leido' && libro.leido
        || (toggleLeidoFilter === 'noLeido' && !libro.leido);

    return textMatch && leidoMatch;
})


  return (
    <LibroContext.Provider value={{
      libros, addLibro, confirmDelete,
      generos, addGenero,
      searchText, setSearchText,
      searchField, setSearchField,
      filteredLibros, editIndex, setEditIndex,
      toggleLeido, setToggleLeidoFilter
    }}>
      <div className='p-4'>
        <Toaster position="top-right" />
        <h1 className='text-center text-4xl font-bold'>Guarda un libro</h1>
        <Form />
        <LibroFilter />
        <LibroList />
      </div>
    </LibroContext.Provider>
  );
}

export default App;
