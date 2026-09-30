/**
 * eXtrategia Consulting - Script Principal
 * Funcionalidad concisa, directa y sin dependencias externas.
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '573117191406';

  // 1. Efecto sutil en Header al hacer Scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // 2. Menú Móvil
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
      });
    });
  }

  // 3. Gestión del Formulario de Contacto Directo
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value.trim();
      const company = document.getElementById('company').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const serviceInterest = document.getElementById('serviceInterest');
      const serviceName = serviceInterest.options[serviceInterest.selectedIndex].text;
      const message = document.getElementById('message').value.trim();

      // Construcción de mensaje estructurado para WhatsApp
      let waMessage = `*Solicitud de Diagnóstico - eXtrategia Consulting*\n\n`;
      waMessage += `*Nombre:* ${fullName}\n`;
      waMessage += `*Empresa:* ${company}\n`;
      waMessage += `*Teléfono:* ${phone}\n`;
      waMessage += `*Línea de Interés:* ${serviceName}\n`;
      if (message) {
        waMessage += `*Mensaje:* ${message}\n`;
      }

      const encodedMessage = encodeURIComponent(waMessage);
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

      // Mostrar confirmación al usuario
      if (formStatus) {
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
        formStatus.innerHTML = `<strong>¡Datos listos!</strong> Redirigiendo a WhatsApp para iniciar su conversación con eXtrategia Consulting...`;
      }

      // Redirigir a WhatsApp después de 1 segundo
      setTimeout(() => {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }, 800);
    });
  }
});
