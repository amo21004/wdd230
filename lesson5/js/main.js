let favorite_chapter_input = document.querySelector('#favchap');

let add_button = document.querySelector('.input button');

let chapter_list = document.querySelector('.listcontainer .list');

add_button.addEventListener('click', function() {
    let favorite_chapter = favorite_chapter_input.value.trim();

    // Make sure input is not empty
    if(favorite_chapter == '') {
        return;
    }

    let li_element = document.createElement('li');

    li_element.textContent = favorite_chapter;

    let delete_button = document.createElement('button');

    delete_button.textContent = '❌';

    li_element.appendChild(delete_button);

    chapter_list.appendChild(li_element);

    delete_button.addEventListener('click', function() {
        chapter_list.removeChild(li_element);
    });

    favorite_chapter_input.value = '';

    favorite_chapter_input.focus();
});