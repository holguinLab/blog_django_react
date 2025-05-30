import axios from "axios"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"


export const Login = ({setLogueado}) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errores, setErrores] = useState([])


    const handleForm = (e) => {

        e.preventDefault()
        const API = import.meta.env.VITE_URL_API
        axios.post(`${API}/aut/token/`, { username: email, password })
            .then(res => {

                localStorage.setItem('token', res.data.access)
                setLogueado(true)
                navigate('/posts')

                /* borramos los campos del formulario y la lista de errores */
                setErrores([])
                setEmail('')
                setPassword('')
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setErrores(error.response.data)

                }

            })
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
                    <form onSubmit={handleForm}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email@example.com" className="input input-bordered" />
                            {errores.email && <p className="label text-warning">{errores.email[0]} </p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••" className="input input-bordered" />
                            {errores.password && <p className="label text-warning">{errores.password[0]} </p>}
                            <label className="label">
                                <Link to="/login" className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary">Login</button>
                        </div>
                        <div className="text-center mt-4">
                            <Link to="/register" className="link link-hover">Need an account? Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
