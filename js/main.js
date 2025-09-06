
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');

  // dim overlay element
  let dim = document.createElement('div');
  dim.className = 'page-dim';
  document.body.appendChild(dim);

  function toggleMenu() {
    burger.classList.toggle('open');
    menu.classList.toggle('active');
    dim.classList.toggle('visible');
  }

  burger.addEventListener('click', toggleMenu);
  dim.addEventListener('click', toggleMenu);
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', toggleMenu);
  });



