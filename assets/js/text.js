
  document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM carregado");
  
  const typingText = document.getElementById("typing-text2");
  console.log("Elemento encontrado:", typingText);
  
  if (!typingText) {
    console.error("Elemento #typing-text2 não encontrado no HTML!");
    return;
  }

  const texts = [
    {
      parts: [
        { text: "O que eles pensam?", className: "" }
       
      ],
      duration: 4000
    },
    {
      parts: [
        { text: "E o que realmente sentem?", className: "" }
        
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
    
    // Adiciona cursor
    html += '<span class="cursor">|</span>';
    
    typingText.innerHTML = html;
    console.log("Renderizado:", html); // Para debug
  }

  function typeEffect() {
    const current = texts[textIndex];
    const fullText = getFullText(current.parts);
    const totalLength = fullText.length;

    if (!isDeleting) {
      charIndex++;
      renderText(current.parts, charIndex);

      if (charIndex < totalLength) {
        setTimeout(typeEffect, 80);
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
        setTimeout(typeEffect, 40);
      } else {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(typeEffect, 300);
      }
    }
  }

  typeEffect();
  console.log("typeEffect iniciado");
});








