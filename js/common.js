window.onload = function() {
    document.querySelector('footer .year').innerHTML = (new Date()).getFullYear();

    document.querySelector('footer .last-updated').innerHTML = document.lastModified;
}