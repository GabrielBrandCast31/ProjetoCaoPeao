// Interações do site (sem dependências externas).
// 1) Toggle dos botões do Simulador (espécie / idade)
// 2) Menu mobile (overlay deslizante)
// 3) Animações de entrada ao rolar (progressive enhancement)
(function () {
  // Marca que o JS está ativo (habilita os estados de reveal no CSS).
  document.documentElement.classList.add('js');

  /* ---------- 1) Seleção única nos grupos do Simulador ---------- */
  function initGroup(group) {
    var buttons = Array.prototype.slice.call(group.querySelectorAll('button'));
    if (buttons.length < 2) return;

    var inactiveBtn = buttons.filter(function (b) {
      return /bg-white\/5/.test(b.className);
    })[0];
    var activeBtn = buttons.filter(function (b) {
      return !/bg-white\/5/.test(b.className);
    })[0];

    if (!inactiveBtn || !activeBtn) return;
    var activeClass = activeBtn.className;
    var inactiveClass = inactiveBtn.className;

    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn === activeBtn ? 'true' : 'false');
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) {
          b.className = inactiveClass;
          b.setAttribute('aria-pressed', 'false');
        });
        btn.className = activeClass;
        btn.setAttribute('aria-pressed', 'true');
      });
    });
  }

  /* ---------- 2) Menu mobile ---------- */
  function initMobileMenu() {
    var btn = document.querySelector('button[aria-label="Abrir Menu"]');
    if (!btn) return;

    var nav = document.querySelector('header nav');
    var links = nav ? Array.prototype.slice.call(nav.querySelectorAll('a')) : [];
    var logo = document.querySelector('header img');

    var overlay = document.createElement('div');
    overlay.className = 'cp-mm';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Menu de navegação');
    overlay.hidden = true;

    var html = '<div class="cp-mm__panel">';
    html += '<button class="cp-mm__close" aria-label="Fechar menu">&times;</button>';
    if (logo) {
      html += '<img class="cp-mm__brand" src="' + logo.getAttribute('src') + '" alt="Cão Peão">';
    }
    html += '<nav class="cp-mm__nav">';
    links.forEach(function (a) {
      html += '<a href="' + a.getAttribute('href') + '">' + a.textContent.trim() + '</a>';
    });
    html += '</nav>';
    html +=
      '<a class="cp-mm__cta" target="_blank" rel="noreferrer" ' +
      'href="https://api.whatsapp.com/send?phone=5531985178147&text=Ol%C3%A1!+Gostaria+de+falar+com+a+equipe+da+cl%C3%ADnica+C%C3%A3o+Pe%C3%A3o.">' +
      'Falar no WhatsApp</a>';
    html += '<a class="cp-mm__cta is-secondary" href="#contato">Agendar Horário</a>';
    html += '<p class="cp-mm__phone">Atendimento<strong>(31) 98517-8147</strong></p>';
    html += '</div>';
    overlay.innerHTML = html;
    document.body.appendChild(overlay);

    function open() {
      overlay.hidden = false;
      // força reflow para a transição rodar
      void overlay.offsetWidth;
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      btn.setAttribute('aria-expanded', 'true');
    }
    function close() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      btn.setAttribute('aria-expanded', 'false');
      setTimeout(function () {
        overlay.hidden = true;
      }, 320);
    }

    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', open);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.closest('.cp-mm__close') || e.target.closest('a')) {
        close();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !overlay.hidden) close();
    });
  }

  /* ---------- 3) Reveal ao rolar ---------- */
  function initReveal() {
    // Anima cada <section> (menos a hero, que está acima da dobra).
    var sections = Array.prototype.slice.call(document.querySelectorAll('main section'));
    var targets = sections.slice(1);
    if (!targets.length) return;

    var vh = window.innerHeight || 800;
    var supported = 'IntersectionObserver' in window;

    var io = supported
      ? new IntersectionObserver(
          function (entries) {
            entries.forEach(function (en) {
              if (en.isIntersecting) {
                en.target.classList.add('is-visible');
                io.unobserve(en.target);
              }
            });
          },
          { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
        )
      : null;

    targets.forEach(function (el) {
      // Já visível na carga: mostra imediatamente (evita "flash").
      if (!supported || el.getBoundingClientRect().top < vh * 0.9) {
        el.setAttribute('data-reveal', '');
        el.classList.add('is-visible');
        return;
      }
      el.setAttribute('data-reveal', '');
      io.observe(el);
    });
  }

  function init() {
    document.querySelectorAll('[data-toggle="single"]').forEach(initGroup);
    initMobileMenu();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
