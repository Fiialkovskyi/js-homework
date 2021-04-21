$(document).ready(function() {
    let userId = 3;
    let postId = 15;

    $.ajax(`https://jsonplaceholder.typicode.com/comments?userId=${userId}&postId=${postId}`)
        .done((data) => {
            let names = data.map((item) => {
                return `
                    <li>${item.name}</li>
                `
            }).join('');
            $('.js-list').html(names);
        });
});