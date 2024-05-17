import React from 'react';
import '../style/landinPage/Features.css';

function Features() {
    return (
        <section className="features">
            <h2>Tus procesos, a un click</h2>
            <h3>Gestión colaborativa de procesos empresariales</h3>
            <div className="features-list">
                <div className="feature">
                    <img src="path/to/icon1.png" alt="Icon 1" />
                    <p>Todos tu procesos en 1 solo sitio</p>
                </div>
                <div className="feature">
                    <img src="path/to/icon2.png" alt="Icon 2" />
                    <p>Accede a toda la documentación</p>
                </div>
                <div className="feature">
                    <img src="path/to/icon3.png" alt="Icon 3" />
                    <p>Gana eficiencia automatizando</p>
                </div>
            </div>
        </section>
    );
}

export default Features;
