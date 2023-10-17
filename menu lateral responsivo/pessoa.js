'use strict'

const close = () => {
    clearFields();
    document.getElementById('abrirModal').classList.remove('show');
    document.getElementById('abrirModal').style.display = 'none';
    document.querySelector('.modal-backdrop').remove();
};

const open = () => {
    document.getElementById('abrirModal').classList.add('show');
    document.getElementById('abrirModal').style.display = 'block';

    document.body.classList.add('modal-open');
    const modalBackdrop = document.createElement('div');
    modalBackdrop.classList.add('modal-backdrop', 'show');
    document.body.appendChild(modalBackdrop);

    const pessoaDropdown = document.getElementById('pessoa');
    pessoaDropdown.innerHTML = '<option value="">Selecione uma pessoa</option>';

    dbPessoa.forEach((pessoa, index) => {
        const option = document.createElement('option');
        option.value = index; // Use o índice da pessoa como valor
        option.textContent = pessoa.nome; // Use o nome da pessoa como texto visível
        pessoaDropdown.appendChild(option);
    });
};

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_pessoa')) ?? [];
const setLocalStorage = (dbPessoa) =>   localStorage.setItem('db_pessoa', JSON.stringify(dbPessoa));

const createPessoa = (objeto) => {
    const dbPessoa = getLocalStorage();
    dbPessoa.push(objeto);
    setLocalStorage(dbPessoa);
};

const readPessoa = () => getLocalStorage();

const updatePessoa = (index, objeto) => {
    const dbPessoa = readPessoa();
    dbPessoa[index] = objeto;
    setLocalStorage(dbPessoa);
}

const deletePessoa = (index) => {
    const dbPessoa = readPessoa();
    dbPessoa.splice(index,1); 
    setLocalStorage(dbPessoa);
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity();
}

const clearFields = () => {
    const fields = document.querySelectorAll('.form-control');
    fields.forEach(field => {
        field.value = '';
    });
};
const savePessoa = () => {
    if(isValidFields()){
        const pessoa = {
            divisao: document.getElementById('divisao').value,
            nome: document.getElementById('nome').value,
            telefone: document.getElementById('telefone').value,
            email: document.getElementById('email').value, 
            celular: document.getElementById('celular').value, 
            aniv: document.getElementById('aniv').value 
        }

        const index = document.getElementById('divisao').dataset.index; 

        if(index === 'novo'){
            createPessoa(pessoa);
            updateTable();
            close();
            location.reload();
        } else {
          updatePessoa(index, pessoa);
          updateTable();
          close();
          location.reload();
        }
    }
}
const createRow = (pessoa, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML =  `
        <td>${pessoa.divisao}</td>
        <td>${pessoa.nome}</td>
        <td>${pessoa.telefone}</td>
        <td>${pessoa.email}</td>
        <td>${pessoa.celular}</td>
        <td>${pessoa.aniv}</td>
        <td >
            <button class="btn btn-primary" style="background-color: #526D82; border: none;" id="edit-${index}">    
            <i class="fa-regular fa-pen-to-square"></i>
            </button>
        </td>
        <td>
            <button class="btn btn-danger" id="delete-${index}">
            <i class="fa-solid fa-trash-can"></i>
            </button>
        </td>   `

        document.querySelector('#tbPessoa>tbody').appendChild(newRow);
}

const clearTable = () => {//remove propria linha ao executar o update() retira linhas duplicadas da tabela
    const rows = document.querySelectorAll('#tbPessoa>tbody tr')
        rows.forEach(row => row.parentNode.removeChild(row));
}

const preencherCampos = (pessoa) => {
    document.getElementById('divisao').value = pessoa.divisao;
    document.getElementById('nome').value = pessoa.nome;
    document.getElementById('telefone').value = pessoa.telefone;
    document.getElementById('email').value = pessoa.email;
    document.getElementById('celular').value = pessoa.celular;
    document.getElementById('aniv').value = pessoa.aniv;
    document.getElementById('divisao').dataset.index = pessoa.index;
}

const updateTable = () => {
    const dbPessoa = readPessoa();
    clearTable();
    dbPessoa.forEach((pessoa, index) => {
        createRow(pessoa, index);
        const editButton = document.getElementById(`edit-${index}`);
        editButton.addEventListener('click', () => editPessoa(index));
    });
}

const editPessoa = (index) => {
    const pessoa =readPessoa()[index];
    pessoa.index = index;
    preencherCampos(pessoa);
    open();
}

/*const editDelete = (event) => {
    if(event.target.type == 'button'){
        const [action, index] = event.target.id.split('-');
        if(action == 'edit'){
            editPessoa(index);
        }else {
            const pessoa = readPessoa()[index];
            const response = confirm(`Deseja excluir o contato de ${pessoa.nome}?`)
            if(response){
                deletePessoa(index);
                updateTable();
            }
        }
    }
}*/

const editDelete = (event) => {
    if (event.target.tagName === 'BUTTON') {
        const buttonId = event.target.id;
        const [action, index] = buttonId.split('-');
        if (action == 'edit') {
            editPessoa(index);
        } else if (action == 'delete') {
            const pessoa = readPessoa()[index];
            const response = confirm(`Deseja excluir o contato de ${pessoa.nome}?`);
            if (response) {
                deletePessoa(index);
                updateTable();
            }
        }
    }
}




updateTable();

document.getElementById('salvar').addEventListener('click', savePessoa);


document.querySelector('#tbPessoa>tbody').addEventListener('click', editDelete);

document.getElementById('cancelar').addEventListener('click', close);

document.querySelector('#tbPessoa>tbody').addEventListener('click', editDelete);



const getLocStorage = () => JSON.parse(localStorage.getItem('db_evento')) ?? [];
const setLocStorage = (dbEvento) => localStorage.setItem('db_evento', JSON.stringify(dbEvento));

const createEvento = (objeto) => {
    const dbEvento = getLocStorage();
    dbEvento.push(objeto);
    setLocStorage(dbEvento);
};

const readEvento = () => getLocStorage();

const updateEvento = (index, objeto) => {
    const dbEvento = readEvento();
    dbEvento[index] = objeto;
    setLocStorage(dbEvento);
};

const deleteEvento = (index) => {
    const dbEvento = readEvento();
    dbEvento.splice(index, 1);
    setLocStorage(dbEvento);
};

const isValidFields2 = () => {
    return document.getElementById('formEvento').reportValidity();
};

const clearFields2 = () => {
    const fields = document.querySelectorAll('.form-control');
    fields.forEach(field => {
        field.value = '';
    });
};

const saveEvento = () => {
    if (isValidFields2()) {
        const evento = {
            pessoaIndex: document.getElementById('pessoa').value, // Corrija para pessoaIndex
            evento: document.getElementById('evento').value,
            data: document.getElementById('data').value,
            inicio: document.getElementById('inicio').value,
            fim: document.getElementById('fim').value
        };

        const index = document.getElementById('nome').dataset.index;

        if (index === 'novo') {
            createEvento(evento);
        } else {
            updateEvento(index, evento);
        }

        updateTable2(); // Corrija para updateTable2
        modalClose();
    }
};

const createRow2 = (evento, index) => {
    const pessoa = dbPessoa[evento.pessoaIndex]; // Corrija para pessoaIndex
    const newRow = document.createElement('tr');
    newRow.innerHTML =  `
        <td>${pessoa.nome}</td>
        <td>${evento.evento}</td>
        <td>${evento.data}</td>
        <td>${evento.inicio}</td>
        <td>${evento.fim}</td>
        <td>
            <button class="btn btn-primary" style="background-color: #526D82; border: none;" id="edit-${index}">
            <i class="fa-regular fa-pen-to-square"></i>
            </button>
        </td>
        <td>
            <button class="btn btn-danger" id="delete-${index}">
            <i class="fa-solid fa-trash-can"></i>
            </button>
        </td>`;

    document.querySelector('#tbEvento>tbody').appendChild(newRow);
};

/*const saveEvento = () => {
    if (isValidFields2()) {
        const evento = {
            nome: document.getElementById('nome').value,
            evento: document.getElementById('evento').value,
            data: document.getElementById('data').value,
            inicio: document.getElementById('inicio').value,
            fim: document.getElementById('fim').value
        };

        const index = document.getElementById('nome').dataset.index;

        if (index === 'novo') {
            createEvento(evento);
        } else {
            updateEvento(index, evento);
        }

        updateTable2();
        modalClose();
    }
};*/

const clearTable2 = () => {
    const rows = document.querySelectorAll('#tbEvento>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
};

const preencherCampos2 = (evento) => {
    document.getElementById('nome').value = evento.nome;
    document.getElementById('evento').value = evento.evento;
    document.getElementById('data').value = evento.data;
    document.getElementById('inicio').value = evento.inicio;
    document.getElementById('fim').value = evento.fim;
    document.getElementById('nome').dataset.index = evento.index;
};

const updateTable2 = () => {
    const dbEvento = readEvento();
    clearTable2();
    dbEvento.forEach((evento, index) => {
        createRow2(evento, index);
        const editButton = document.getElementById(`edit-${index}`);
        editButton.addEventListener('click', () => editEvento(index));
    });
};

const editEvento = (index) => {
    const evento = readEvento()[index];
    evento.index = index;
    preencherCampos2(evento);

    // Selecione a pessoa vinculada ao evento no combobox
    const pessoaDropdown = document.getElementById('pessoa');
    pessoaDropdown.value = evento.pessoaIndex;

    openModal();
};

const editDeleteEvento = (event) => {
    if (event.target.tagName === 'BUTTON') {
        const buttonId = event.target.id;
        const [action, index] = buttonId.split('-');
        if (action == 'edit') {
            editEvento(index);
        } else if (action == 'delete') {
            const evento = readEvento()[index];
            const response = confirm(`Deseja excluir o Evento de ${evento.nome}?`);
            if (response) {
                deleteEvento(index);
                updateTable();
            }
        }
    }
};

updateTable2();

document.getElementById('salvar').addEventListener('click', saveEvento);

document.querySelector('#tbEvento>tbody').addEventListener('click', editDeleteEvento);


document.getElementById('cancelar').addEventListener('click', modalClose);

document.querySelector('#tbEvento>tbody').addEventListener('click', editDeleteEvento);



