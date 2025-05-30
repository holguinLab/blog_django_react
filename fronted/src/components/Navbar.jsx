import { Link } from 'react-router-dom'

export const Navbar = ({ setLogueado }) => {

    const handleButtonLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('accesToken')
        setLogueado(false)
    }
    return (
        <div className="navbar bg-base-100 shadow-lg">
            {/* Navbar Start */}
            <div className="navbar-start">
                {/* Dropdown para móviles */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                </div>

                {/* Logo */}
                <Link to="/" className="btn btn-ghost normal-case text-xl">ModernBlog</Link>
            </div>

            {/* Navbar Center en pantallas grandes */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Login</Link></li>
                    <li><Link to="/">Contact</Link></li>
                </ul>
            </div>

            {/* Navbar End con botón */}
            <div className="navbar-end">
                {/* Aquí puedes cambiar esto por lógica real después */}
                <Link to="/register" className="btn">Sign Up</Link>
                {/* Ejemplo si estás logueado: <button className="btn">Logout</button> */}
            </div>
        </div>
    )
}

