const AppHeader = () => (
    <header className="py-2 bg-body-tertiary">
        <div className="container d-flex justify-content-between align-items-center">
            <a
                className="mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none fs-4"
                href="/"
            >
                OtaMarket
            </a>
            <a className="icon-link link-dark" href="/profile">
                <i className="bi bi-person-circle h2 mb-0"></i>
            </a>
        </div>
    </header>
);

export default AppHeader;
