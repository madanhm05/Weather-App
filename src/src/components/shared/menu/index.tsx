export const TopMenu = () => {
    return (
        <div className="container-fluid ">
    <nav className="navbar navbar-expand-lg navbar-light bg-light rounded-3 w-100 mx-auto m-2">

        <div className="navbar-brand mx-auto">
            <h1 className="text-warning font-weight-bold">
                WeatherApp
            </h1>
        </div>
        <div className="d-flex">
            <button className="btn btn-link">
                <div className="indicator">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                    <span className="badge rounded-pill bg-primary position-absolute top-0 start-100 translate-middle badge-sm"></span>
                </div>
            </button>
        </div>
    </nav>
</div>

    );
};
