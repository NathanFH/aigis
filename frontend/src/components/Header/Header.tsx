import "./Header.css"; 

export default function Header() {
  return (
    <header className="header">
      <img
        src="/woovi_logo.png"
        alt="Logo"
        className="logo"
      />
      <nav className="menu">
        <a href="#home">Home</a>
        <a href="#sobre">Sobre</a>
        <a href="#contato">Contato</a>
      </nav>
    </header>
  );
}