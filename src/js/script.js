 // login - validacao
  if (document.getElementById("form-login")) {
    const form = document.getElementById("form-login");
    const linkCadastro = document.getElementById("link-cadastro");

    form.addEventListener("submit", function (evento) {
      evento.preventDefault();

      const email = document.getElementById("email").value.trim();
      const senha = document.getElementById("senha").value;
      const erroEmail = document.getElementById("erro-email");
      const erroSenha = document.getElementById("erro-senha");

      erroEmail.textContent = "";
      erroSenha.textContent = "";

      if (email === "") {
        erroEmail.textContent = "Preencha o e-mail.";
        alert("Por favor, preencha o e-mail.");
        return;
      }

      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(email)) {
        erroEmail.textContent = "Formato de e-mail invalido.";
        return;
      }

      if (senha === "") {
        erroSenha.textContent = "Preencha a senha.";
        alert("Por favor, preencha a senha.");
        return;
      }

      if (senha.length < 6) {
        erroSenha.textContent = "A senha deve ter no minimo 6 caracteres.";
        return;
      }

      window.location.href = "camera.html";
    });

    linkCadastro.addEventListener("click", function (evento) {
      evento.preventDefault();
      alert("Em breve!");
    });
  }

  // ocr - copiar texto
  if (document.getElementById("btn-copiar")) {
    const btnCopiar = document.getElementById("btn-copiar");
    btnCopiar.addEventListener("click", function () {
      const texto = document.getElementById("texto-ocr").innerText;
      navigator.clipboard.writeText(texto);
      alert("Texto copiado!");
    });
  }

  // organizar - adicionar materia
  if (document.getElementById("btn-adicionar-materia")) {
    const btnAdicionar = document.getElementById("btn-adicionar-materia");
    btnAdicionar.addEventListener("click", function () {
      const nome = prompt("Nome da materia:");
      if (nome !== null && nome.trim() !== "") {
        const lista = document.getElementById("lista-materias");
        const item = document.createElement("li");
        item.className = "card-materia";
        item.innerHTML =
          '<div class="barra-lateral"></div>' +
          '<div class="info-materia"><strong>' + nome + '</strong><span>0 documentos</span></div>' +
          '<span class="chevron">&rsaquo;</span>';
        lista.appendChild(item);
        alert("Materia '" + nome + "' adicionada!");
      }
    });
  }

  // galeria - slideshow
  if (document.getElementById("lightbox")) {
    const fotos = document.querySelectorAll(".foto");
    const lightbox = document.getElementById("lightbox");
    const lightboxImagem = document.getElementById("lightbox-imagem");
    const lightboxIndicador = document.getElementById("lightbox-indicador");
    let indiceAtual = 0;
  
    function atualizarLightbox() {
      const foto = fotos[indiceAtual];
      lightboxImagem.style.backgroundColor = foto.style.backgroundColor;
      lightboxImagem.textContent = foto.textContent;
      lightboxIndicador.textContent = (indiceAtual + 1) + " de " + fotos.length;
    }
  
    function abrirLightbox(indice) {
      indiceAtual = indice;
      atualizarLightbox();
      lightbox.style.display = "flex";
    }

    function fecharLightbox() {
      lightbox.style.display = "none";
    }

    function fotoAnterior() {
      indiceAtual = (indiceAtual - 1 + fotos.length) % fotos.length;
      atualizarLightbox();
    }

    function fotoProxima() {
      indiceAtual = (indiceAtual + 1) % fotos.length;
      atualizarLightbox();
    }

    for (let i = 0; i < fotos.length; i++) {
      const indice = i;
      fotos[i].addEventListener("click", function () {
        abrirLightbox(indice);
      });
    }

    document.getElementById("btn-fechar-lightbox").addEventListener("click", fecharLightbox);
    document.getElementById("btn-anterior").addEventListener("click", fotoAnterior);
    document.getElementById("btn-proximo").addEventListener("click", fotoProxima);

    document.addEventListener("keydown", function (evento) {
      if (lightbox.style.display !== "flex") return;
      if (evento.key === "Escape") fecharLightbox();
      if (evento.key === "ArrowLeft") fotoAnterior();
      if (evento.key === "ArrowRight") fotoProxima();
    });

    const filtros = document.querySelectorAll(".filtros .chip");
    for (let i = 0; i < filtros.length; i++) {
      filtros[i].addEventListener("click", function () {
        for (let j = 0; j < filtros.length; j++) {
          filtros[j].classList.remove("chip-ativo");
        }   
        filtros[i].classList.add("chip-ativo");
      });
    }
  }