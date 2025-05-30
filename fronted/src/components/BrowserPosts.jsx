import { useState } from "react";

export function BrowersPosts({ usuarios }) {
    const [busqueda, setBusqueda] = useState('')
    const [sugerencias, setSugerencias] = useState([])

    const handleChange = (e) => {
        e.preventDefault()
        setBusqueda(e.target.value)

        const filtrados = usuarios.filter(usuario =>
            usuario.first_name.toLowerCase().includes(busqueda.toLowerCase()) ||
            usuario.last_name.toLowerCase().includes(busqueda.toLowerCase()) ||
            usuario.email.toLowerCase().includes(busqueda.toLowerCase())
        );
        setSugerencias(busqueda === '' ? [] : filtrados)
    }

    return (
        <div className="form-control relative max-w-md w-full mx-auto">
            <div className="relative">
                <div className="join w-full">
                    <div className="join-item bg-base-100 pl-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="input input-bordered join-item w-full focus:outline-none"
                        placeholder="Buscar personas por nombre o email..."
                        value={busqueda}
                        onChange={handleChange}
                    />
                    {busqueda && (
                        <button 
                            onClick={() => setBusqueda('')}
                            className="btn join-item btn-ghost"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Dropdown de Sugerencias */}
            {busqueda && sugerencias.length > 0 && (
                <div className="absolute top-full mt-2 w-full z-30">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body p-2">
                            <div className="max-h-60 overflow-y-auto">
                                {sugerencias.map((usuario) => (
                                    <div
                                        key={usuario.id}
                                        className="flex items-center gap-3 p-2 hover:bg-base-200 rounded-lg cursor-pointer transition-colors duration-200"
                                    >
                                        <div className="avatar">
                                            <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <img
                                                    src={usuario.foto || "https://i.pravatar.cc/100"}
                                                    alt={`Avatar de ${usuario.first_name}`}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-base-content">
                                                {usuario.first_name} {usuario.last_name}
                                            </p>
                                            <p className="text-sm text-base-content/70 truncate">
                                                {usuario.email}
                                            </p>
                                        </div>
                                        <button className="btn btn-ghost btn-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}