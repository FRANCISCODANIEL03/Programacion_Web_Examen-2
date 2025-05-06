import { createContext, useContext } from 'react';

export const LibroContext = createContext();

export const useLibroContext = () => useContext(LibroContext);
