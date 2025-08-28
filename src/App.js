// App.js
import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProductGridStep1 from './components/ProductGridStep1';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

                <nav className="App-nav">
                    <a href="#inicio">Inicio</a> |{" "}
                    <a href="#productos">Productos</a> |{" "}
                    <a href="#contacto">Contacto</a>
                </nav>

                <p>Bienvenido a nuestro catálogo de importaciones.</p>

                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>

            <main>
                <ProductGridStep1 />
            </main>
        </div>
    );
}

export default App;
