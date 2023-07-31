
const limit = 50
let curPage = 0;

document.addEventListener('DOMContentLoaded', e => {
    // insertion form
    const createMonster = document.getElementById('create-monster');
    const form = document.createElement('form');
    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.id = 'name';
    inputName.placeholder = 'name...';
    const inputAge = document.createElement('input');
    inputAge.type = 'text';
    inputAge.id = 'age';
    inputAge.placeholder = 'age...'
    const inputDescription = document.createElement('input');
    inputDescription.type = 'text';
    inputDescription.id = 'description';
    inputDescription.placeholder = 'description...';
    const inputSubmit = document.createElement('input');
    inputSubmit.type = 'submit';
    inputSubmit.value = 'Create';
    form.append(inputName, inputAge, inputDescription, inputSubmit);
    createMonster.appendChild(form);

    form.addEventListener('submit', e => {
        e.preventDefault();

        const newName = document.getElementById('name').value;
        const newAge = document.getElementById('age').value;
        const newDescription = document.getElementById('description').value;
        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                'name': newName,
                'age': newAge,
                'description': newDescription,
            }),
        })
        .then(resp => console.log(resp))
        .catch(error => console.log(error));

        e.target.reset();
    });

    // display the first page
    curPage++;
    fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${curPage}`)
    .then(resp => resp.json())
    .then(monsters => updateMonsterList(monsters))
    .catch(error => console.log(error));

    // back button
    document.getElementById('back').addEventListener('click', e => {
        if (curPage <= 1) {
            alert('Aint no monsters here');
            return;
        }
    
        curPage--;
        fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${curPage}`)
        .then(resp => resp.json())
        .then(monsters => updateMonsterList(monsters))
        .catch(error => console.log(error));
    });
    
    // forward button
    document.getElementById('forward').addEventListener('click', e => {
        console.log(curPage);

        curPage++;
        fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${curPage}`)
        .then(resp => resp.json())
        .then(monsters => updateMonsterList(monsters))
        .catch(error => console.log(error));
    });


});

function updateMonsterList(monsters) {
    console.log(monsters);

    const monsterContainer = document.getElementById('monster-container');
    monsterContainer.innerHTML = '';
    monsters.forEach(monster => {
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        const h4 = document.createElement('h4');
        const p = document.createElement('p');
        h2.textContent = monster.name;
        h4.textContent = `Age: ${monster.age}`;
        p.textContent = `Bio: ${monster.description}`;
        div.append(h2, h4, p);
        monsterContainer.appendChild(div);
    })
}

