import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CardPost } from "./CardPost";
import { BrowersPosts } from "./BrowserPosts";
import { CrearPost } from "./CrearPost";
import { FollowCard } from "./FollowCard";

export function Posts() {
    const API = import.meta.env.VITE_URL_API;
    const [posts, setPosts] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    const listar_post = () => {
        axios.get(`${API}/api/listar_posts/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
            .then((res) => setPosts(res.data))
            .catch((err) => {
                if (err.response?.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }
            });
    };

    const lista_usuarios = () => {
        axios.get(`${API}/api/listar_usuarios/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
            .then((res) => setUsuarios(res.data))
            .catch((err) => {
                if (err.response?.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }
            });
    };

    useEffect(() => {
        listar_post();
        lista_usuarios();
    }, []);

    return (
        <div className="min-h-screen bg-base-200">
            {/* Hero Section */}
            <section className="hero min-h-[40vh] bg-base-100 relative overflow-hidden">
                <div className="hero-overlay bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm"></div>
                <div className="hero-content text-center relative z-10">
                    <div className="max-w-2xl">
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
                            ModernBlog
                        </h1>
                        <p className="text-lg md:text-xl text-base-content/70 leading-relaxed mb-6">
                            Descubre historias fascinantes, comparte tus ideas y conecta con mentes curiosas de todo el mundo.
                        </p>
                        <Link to="/register" className="btn btn-primary btn-lg gap-2 transition-all hover:scale-105">
                            Empezar a Escribir
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-8 sticky top-4">
                        <CrearPost />
                        <div className="divider">Personas Sugeridas</div>
                        <div className="hidden lg:block space-y-4">
                            {usuarios.map((usuario, index) => (
                                <FollowCard key={index} usuario={usuario} />
                            ))}
                        </div>
                    </aside>

                    {/* Main Posts */}
                    <main className="lg:col-span-3 space-y-10">
                        <div className="w-full">
                            <BrowersPosts usuarios={usuarios} />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Últimas Publicaciones
                            </h2>
                            <div className="join bg-base-100 shadow-md">
                                <button className="join-item btn btn-sm">Recientes</button>
                                <button className="join-item btn btn-ghost btn-sm">Populares</button>
                                <button className="join-item btn btn-ghost btn-sm">Tendencias</button>
                            </div>
                        </div>

                        {posts.length === 0 ? (
                            <div className="card bg-base-100 shadow-lg py-16 text-center">
                                <div className="card-body items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    <h3 className="text-xl font-semibold">No hay publicaciones disponibles</h3>
                                    <p className="text-base-content/60">Sé el primero en compartir algo interesante</p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                                {posts.map((post, index) => (
                                    <CardPost key={index} post={post} />
                                ))}
                            </div>
                        )}

                        {posts.length > 0 && (
                            <div className="text-center pt-8">
                                <button className="btn btn-outline btn-wide gap-2 hover:scale-105 transition-transform duration-200">
                                    Cargar Más
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </main>
                </div>

                {/* Usuarios sugeridos en móvil */}
                <div className="lg:hidden mt-14">
                    <div className="divider">Personas Sugeridas</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        {usuarios.map((usuario, index) => (
                            <FollowCard key={index} usuario={usuario} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
