// Interações mínimas (seleção única) — reativa os botões de escolha do Simulador
// (espécie: Cachorro/Gato | idade: Filhote/Adulto/Sênior) sem reconstruir o app.
(function () {
  function initGroup(group) {
    var buttons = Array.prototype.slice.call(group.querySelectorAll('button'));
    if (buttons.length < 2) return;

    // Captura, no estado inicial, o template de classe "ativo" e "inativo".
    // Inativo = botão cujo fundo é translúcido (bg-white/5); ativo = o destacado.
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

  function init() {
    document.querySelectorAll('[data-toggle="single"]').forEach(initGroup);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
