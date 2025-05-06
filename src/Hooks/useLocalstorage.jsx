import { useEffect, useState } from "react"

const useLocalStorage = (key, valorInicial) => {
    const [valor, setValor] = useState(() =>{
        const valorGuardado = localStorage.getItem(key)
        return valorGuardado ? JSON.parse(valorGuardado) : valorInicial
    })

    useEffect(() =>{
        localStorage.setItem(key, JSON.stringify(valor))
    }, [key, valor])

    return [valor, setValor]
}

export default useLocalStorage