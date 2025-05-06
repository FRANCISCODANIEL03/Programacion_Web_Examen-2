import React from 'react';
import { useLibroContext } from '../context/LibroContext';

export function LibroFilter() {
    const {
        searchText, setSearchText,
        searchField, setSearchField,
        toggleLeidoFilter, setToggleLeidoFilter
    } = useLibroContext();

    return (
        <div className="flex gap-4 justify-center items-center mb-4">
            <input
                type="text"
                placeholder="Buscar"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="border-b-2 border-indigo-500 outline-none"
            />

            <select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                className="border-b-2 border-indigo-500 outline-none"
            >
                <option value="titulo">Título</option>
                <option value="autor">Autor</option>
                <option value="genero">Género</option>
                <option value="año">Año</option>
            </select>

            <select
                value={toggleLeidoFilter}
                onChange={(e) => setToggleLeidoFilter(e.target.value)}
                className="border-b-2 border-indigo-500 outline-none"
            >
                <option value="leido">Leidos</option>
                <option value="noLeido">No leidos</option>
            </select>
        </div>
    );
}
