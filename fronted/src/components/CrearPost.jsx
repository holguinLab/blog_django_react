import axios from "axios"
import { useEffect, useState } from "react"

export function CrearPost() {
    const API = import.meta.env.VITE_URL_API;
    const [titulo, setTitulo] = useState('')
    const [cuerpo, setCuerpo] = useState('')

    const handleForm = (e) => {
        e.preventDefault()
        axios.post(`${API}/api/crear_post/`, { titulo, cuerpo }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then((res) => {
                alert(res.data.mensaje)
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-primary mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Crear Nueva Publicación
                </h2>

                <form onSubmit={handleForm} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Título</span>
                        </label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                            placeholder="¿Sobre qué quieres escribir?"
                            className="input input-bordered w-full focus:input-primary"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Contenido</span>
                        </label>
                        <textarea
                            value={cuerpo}
                            onChange={e => setCuerpo(e.target.value)}
                            className="textarea textarea-bordered h-24 focus:textarea-primary"
                            placeholder="Comparte tus ideas..."
                        ></textarea>
                    </div>

                    <div className="card-actions justify-end">
                        <button
                            type="submit"
                            className="btn btn-primary w-full gap-2 hover:btn-primary-focus"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Publicar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
