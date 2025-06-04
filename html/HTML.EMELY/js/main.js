document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para los enlaces de navegación
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Colapsar el menú hamburguesa después de hacer clic en un enlace (para móviles)
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarToggler && navbarCollapse.classList.contains('show')) {
                navbarToggler.click(); // Simula un clic en el botón para cerrarlo
            }
        });
    });

    // Validación básica del formulario de contacto (si no usas un backend)
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                alert('Por favor, completa todos los campos del formulario.');
                event.preventDefault(); // Evita que el formulario se envíe
            } else if (!validateEmail(email)) {
                alert('Por favor, ingresa una dirección de correo electrónico válida.');
                event.preventDefault();
            } else {
                // Si todo es válido, podrías enviar el formulario a un servicio como Formspree o Netlify Forms
                alert('¡Mensaje enviado con éxito! Te contactaré pronto.');
                // En un entorno real, aquí se haría un fetch() o XMLHttpRequest para enviar los datos
            }
        });
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Opcional: Efecto de aparición de elementos al hacer scroll (requiere Intersection Observer API o librerías)
    // Ejemplo básico:
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1 // Cuando el 10% de la sección es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); // Añade una clase para animación
                observer.unobserve(entry.target); // Deja de observar una vez que ha aparecido
            }
        });
    }, options);

    sections.forEach(section => {
        section.classList.add('fade-hidden'); // Clase inicial para ocultar/preparar animación
        observer.observe(section);
    });
});