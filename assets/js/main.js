/*=============== SHOW MENU ===============*/
const showMenu = (navId, navToggle,navClose) => {
    const nav = document.getElementById(navId),
          toggle = document.getElementById(navToggle),
          close = document.getElementById(navClose)

    toggle.addEventListener('click', () =>{
        nav.classList.toggle('show-menu')
        
    })



}

showMenu('nav-menu', 'nav-toggle', 'nav-close')

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD SHADOW HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header')

    this.scrollY >= 50 ? header.classList.add('scroll-header')
                       : header.classList.remove('scroll-header')
          
}
window.addEventListener('scroll', scrollHeader)


/*=============== SWIPER REVIEWS ===============*/
const swiperReviews = new Swiper('.swiper',{
    loop: true,
    spaceBetween: 16,
    grabCursor: true,
    speed: 600,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',

    },
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    }
})

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 460 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 250) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

  const typingText = document.getElementById("typing-text");

  const texts = [
    {
      parts: [
        { text: "Cresça com um site ", className: "" },
        { text: "forte", className: "highlight" }
      ],
      duration: 4000
    },
    {
      parts: [
        { text: "Alcance mais ", className: "" },
        { text: "clientes", className: "highlight" }
        
      ],
      duration: 5000
    }
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function getFullText(parts) {
    return parts.map(part => part.text).join("");
  }

  function renderText(parts, visibleChars) {
    let charsLeft = visibleChars;
    let html = "";

    for (let part of parts) {
      const take = Math.min(charsLeft, part.text.length);
      if (take > 0) {
        const slicedText = part.text.slice(0, take);
        if (part.className) {
          html += `<span class="${part.className}">${slicedText}</span>`;
        } else {
          html += slicedText;
        }
        charsLeft -= take;
      }
    }

    typingText.innerHTML = html;
  }

  function typeEffect() {
    const current = texts[textIndex];
    const fullText = getFullText(current.parts);
    const totalLength = fullText.length;

    if (!isDeleting) {
      charIndex++;
      renderText(current.parts, charIndex);

      if (charIndex < totalLength) {
        setTimeout(typeEffect, 80); // velocidade ao escrever
      } else {
        setTimeout(() => {
          isDeleting = true;
          typeEffect();
        }, current.duration);
      }
    } else {
      charIndex--;
      renderText(current.parts, charIndex);

      if (charIndex > 0) {
        setTimeout(typeEffect, 40); // velocidade ao apagar
      } else {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 300);
      }
    }
  }

  typeEffect();


/*=============== DARK LIGHT THEME ===============*/
// Script para enviar dados do formulário para o WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');
    
    // Número do WhatsApp (apenas números)
    const phoneNumber = '244953545808';
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Capturar os valores dos campos
            const empresa = document.querySelector('input[name="user_name"]').value.trim();
            const categoria = document.querySelector('input[name="user_email"]').value.trim();
            const mensagem = document.querySelector('textarea[name="user_message"]').value.trim();
            
            // Validar se os campos obrigatórios estão preenchidos
            if (!empresa || !categoria) {
                showMessage('Por favor, preencha o nome da empresa e a categoria.', 'error');
                return;
            }
            
            // Criar a mensagem formatada
            const mensagemFormatada = `*Contato via Site*\n\n` +
                                     `*🏢 Nome da Empresa:*\n${empresa}\n\n` +
                                     `*📋 Categoria:*\n${categoria}\n\n` +
                                     `*💬 Mensagem:*\n${mensagem || 'Nenhuma mensagem fornecida'}`;
            
            // Codificar a mensagem para URL
            const mensagemCodificada = encodeURIComponent(mensagemFormatada);
            
            // Criar o link do WhatsApp
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${mensagemCodificada}`;
            
            // Abrir o WhatsApp em uma nova aba
            window.open(whatsappLink, '_blank');
            
            // Mostrar mensagem de sucesso
            showMessage('Redirecionando para o WhatsApp...', 'success');
            
            // Opcional: Limpar o formulário após o envio
            // contactForm.reset();
            
            // Opcional: Fechar a mensagem de sucesso após alguns segundos
            setTimeout(() => {
                if (contactMessage) {
                    contactMessage.style.display = 'none';
                }
            }, 5000);
        });
    }
    
    // Função para mostrar mensagens de feedback
    function showMessage(message, type) {
        if (contactMessage) {
            contactMessage.textContent = message;
            contactMessage.className = `contact__message ${type}`;
            contactMessage.style.display = 'block';
            
            // Estilizar a mensagem
            if (type === 'error') {
                contactMessage.style.color = '#dc3545';
                contactMessage.style.backgroundColor = '#f8d7da';
            } else {
                contactMessage.style.color = '#28a745';
                contactMessage.style.backgroundColor = '#d4edda';
            }
            
            contactMessage.style.padding = '10px';
            contactMessage.style.borderRadius = '5px';
            contactMessage.style.marginTop = '10px';
            contactMessage.style.textAlign = 'center';
            
            // Esconder a mensagem após alguns segundos
            setTimeout(() => {
                if (contactMessage) {
                    contactMessage.style.display = 'none';
                }
            }, 4000);
        }
    }
    
    // Validação em tempo real (opcional)
    const inputs = document.querySelectorAll('.contact__input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (contactMessage && contactMessage.style.display === 'block') {
                contactMessage.style.display = 'none';
            }
        });
    });
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
