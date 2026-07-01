import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <a className="brand-lockup" href="#home" aria-label="Eutelia home">
        <img className="brand-crest" src="/images/logo.png" alt="EUTELIA logo" />
      </a>
      <nav className="navbar-links" aria-label="Primary navigation">
        <a className="active" href="#home">Home</a>
        <a href="#about">About Us</a>
        <a href="#features">Features</a>
        <a href="#modules">Modules</a>
        <a href="#benefits">Benefits</a>
        <a href="#contact">Contact Us</a>
      </nav>
      <Link to="/login" className="navbar-login-button">
        <span aria-hidden="true">-&gt;</span>
        Login
      </Link>
    </header>
  );
}
