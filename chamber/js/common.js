document.addEventListener('DOMContentLoaded', function () {
    document
    .querySelectorAll('header .toggle img')
    .forEach((element) => {
      element.addEventListener('click', function () {
        document.querySelector('header .links').classList.toggle('open');

        document
          .querySelectorAll('header .toggle img')
          .forEach((element) => {
            element.classList.toggle('none');
          });
      });
    });

    document.querySelector('header .current-date').innerHTML = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date());

    document.querySelector('footer .year').innerHTML = (new Date()).getFullYear();

    document.querySelector('footer .last-updated').innerHTML = document.lastModified;
});