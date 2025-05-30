export function FollowCard({ usuario }) {
    return (
        <div className="w-full">
            {!usuario.is_superuser && (
                <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="avatar online">
                                    <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img
                                            src="https://i.pravatar.cc/100"
                                            alt={`${usuario.first_name}'s avatar`}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-base leading-tight">
                                        {usuario.first_name}
                                    </h3>
                                    <p className="text-sm text-base-content/60">
                                        @{usuario.first_name.toLowerCase().replace(' ', '_')}
                                    </p>
                                </div>
                            </div>
                            
                            <button className="btn btn-primary btn-sm gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Seguir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
