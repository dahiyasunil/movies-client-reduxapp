import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-dark">
      <div className="container">
        <nav className="navbar navbar-expand-lg">
          <div>
            <Link to="/" className="btn border-0">
              <i
                className="bi bi-film navbar-brand"
                style={{
                  fontSize: "3rem",
                  color: "white",
                }}
              ></i>
              <span className="text-light">Movies</span>
            </Link>
          </div>
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarnav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/" className="nav-link text-light">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/manage/add" className="nav-link text-light">
                  Add Movie
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
