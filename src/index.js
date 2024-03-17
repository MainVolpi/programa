import './style.css';

// variáveis globais
let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

// --------
const calendar = document.getElementById('calendar'); // div calendar:

// função load() será chamada quando a página carregar:
function load() {
    const date = new Date();

    // mudar título do mês:
    if (nav !== 0) {
        date.setMonth(new Date().getMonth() + nav);
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const daysMonth = new Date(year, month + 1, 0).getDate();

    const paddinDays = 0;

    // mostrar mês e ano:
    document.getElementById('monthDisplay').innerText = `${date.toLocaleDateString('pt-br', { month: 'long' })}, ${year}`;

    calendar.innerHTML = '';

    // criando uma div com os dias:
    for (let i = 1; i <= paddinDays + daysMonth; i++) {
        const dayS = document.createElement('div');
        dayS.classList.add('day');

        dayS.addEventListener('click', function (e) {
            const dayString = `${month + 1}/${i - paddinDays}/${year}`;
            deleteEvent(dayString);
            load();
        });

        const dayString = `${month + 1}/${i - paddinDays}/${year}`;

        // condicional para criar os dias de um mês:
        if (i > paddinDays) {
            dayS.innerText = i - paddinDays;

            const eventDay = events.find(event => event.date === dayString);

            if (i - paddinDays === day && nav === 0) {
                dayS.id = 'currentDay';
            }

            if (eventDay) {
                for (let i = 0; i < eventDay.length; i++) {
                    console.log(1)
                }
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventDay.title;
                dayS.appendChild(eventDiv);
            }
        } else {
            dayS.classList.add('padding');
        }

        calendar.appendChild(dayS);
    }
}

function saveEvent(dateString, title) {
    events.push({
        date: dateString,
        title: title
    });

    localStorage.setItem('events', JSON.stringify(events));
}

function deleteEvent(dateToDelete) {
    events = events.filter(event => event.date !== dateToDelete);
    localStorage.setItem('events', JSON.stringify(events));
}


// botões 
function buttons() {
    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });

    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });
}

buttons();
load();

const submitButton = document.querySelector('#submit');

submitButton.addEventListener('click', () => {
    const dificuldade = document.getElementById('dificuldade');
    const dificuldadeLength = dificuldade.value;
    const nome = document.getElementById('nome');
    const nomeLength = nome.value.length;
    const data = document.getElementById('data');
    const dataLength = data.value;

    // Verificando se os campos estão preenchidos
    if (nomeLength == 0) {
        alert('[ERRO] Nome incompleto! Por favor, insira um nome.');
    } else if (nomeLength > 255) {
        alert('[ERRO] O nome inserido é muito longo. Por favor, insira um nome mais curto.');
    }
    if (dificuldadeLength == 0) {
        alert('[ERRO] dificuldade não especificada! Por favor, forneça uma importância.');
    } else if (dificuldadeLength > 10 || dificuldadeLength < 0) {
        alert('[ERRO] A dificuldade deve estar entre 0 e 10.');
    }
    if (dataLength == 0) {
        alert('[ERRO] Data incompleto! Por favor, insira uma data.');
    } else {
        // Criando a data no formato apropriado
        const date = new Date(data.value);
        const dateString = `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`;

        // Salvando o evento
        const diasParaProva = 12
        const diasEstudar = Math.round((dificuldade.value * diasParaProva) / 10);

        for (let c = 0; c < diasEstudar; c++) {
            saveEvent(dateString, 'estudar' + ' ' + nome.value)
        }

        saveEvent(dateString, nome.value);

        // Recarregando o calendário após salvar o evento
        load();
    }
});
