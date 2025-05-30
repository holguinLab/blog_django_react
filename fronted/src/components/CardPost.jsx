import { useState } from "react";

export function CardPost({ post }) {
    const [color, setColor] = useState("none");

    const handleClick = () => {
        setColor(color === "none" ? "red" : "none");
    };

    return (
        <div className="card w-full max-w-md bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body p-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                        <div className="avatar">
                            <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    src="https://i.pravatar.cc/100"
                                    alt="User avatar"
                                />
                            </div>
                        </div>

                        <div>
                            <p className="font-semibold text-base">
                                {post.autor_detalle.first_name} {post.autor_detalle.last_name}
                            </p>
                            <p className="text-sm opacity-70">
                                @{post.autor_detalle.email.split('@')[0]}
                            </p>
                        </div>
                    </div>

                    <button className="btn btn-ghost btn-circle btn-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <circle cx={12} cy={12} r={1} />
                            <circle cx={19} cy={12} r={1} />
                            <circle cx={5} cy={12} r={1} />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="my-4">
                    <p className="text-base-content/80 leading-relaxed">
                        {post.cuerpo}
                    </p>
                </div>

                {/* Footer Icons */}
                <div className="flex justify-between items-center pt-4 border-t border-base-200">
                    <div className="flex items-center gap-6">
                        {/* Like Button */}
                        <button 
                            onClick={handleClick}
                            className="btn btn-ghost btn-sm px-0 hover:bg-transparent hover:text-error"
                        >
                            <svg
                                className="w-5 h-5"
                                fill={color}
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                        </button>

                        {/* Share Button */}
                        <button className="btn btn-ghost btn-sm px-0 hover:bg-transparent">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1={12} y1={3} x2={12} y2={15} />
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* More Options */}
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-sm px-0 hover:bg-transparent">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <circle cx={12} cy={12} r={1} />
                                    <circle cx={19} cy={12} r={1} />
                                    <circle cx={5} cy={12} r={1} />
                                </svg>
                            </label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52">
                                <li><a>Reportar</a></li>
                                <li><a>Copiar enlace</a></li>
                            </ul>
                        </div>

                        {/* Bookmark */}
                        <button className="btn btn-ghost btn-sm px-0 hover:bg-transparent">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}