(function(){
    const appList = document.getElementById('applist');
    const URL = 'https://jsonplaceholder.typicode.com/users';
    
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            let listItems = data.map((item) => {
                return `
                    <li>
                        <p>Name: ${item.name}</p>
                        <p>Phone: ${item.phone}</p>
                    </li>
                `;
            }).join('');
            appList.innerHTML = listItems;
        });
})();