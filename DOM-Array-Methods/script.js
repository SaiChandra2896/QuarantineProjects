const addUserbtn = document.getElementById('add-user');
const main = document.getElementById('main');
const doubleMoneybtn = document.getElementById('double-money');
const showMillionairesbtn = document.getElementById('show-millionaires');
const sortbtn = document.getElementById('sort');
const calculateWealthbtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();


async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const resdata = await res.json();

    const person = resdata.results[0];

    const newPerson = {
        name: `${person.name.first} ${person.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newPerson);
}

//double money
function doubleMoney() {
    data = data.map(person => {
        return { ...person, money: person.money * 2 }
    });

    updateDOM();
}

//add data to data array
function addData(newPerson) {
    data.push(newPerson);

    updateDOM();
}

//show millioneres 
function showMillionaires() {
    data = data.filter(person => person.money > 100000);
    updateDOM();
}

//sort by richest
function sortRich() {
    //console.log('123')
    data = data.sort((a, b) => b.money - a.money);

    updateDOM();
}

//calculate wealth
function calculateWealth() {
    const wealth = data.reduce((acc, item) => (acc += item.money), 0);

    // console.log(formatMoney(wealth))
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEl);
}

//update Dom
function updateDOM(providedData = data) {
    //clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;

        main.appendChild(element);
    });
}

//format number as money -- https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}



//console.log(data)

addUserbtn.addEventListener('click', getRandomUser);
doubleMoneybtn.addEventListener('click', doubleMoney);
showMillionairesbtn.addEventListener('click', showMillionaires);
sortbtn.addEventListener('click', sortRich);
calculateWealthbtn.addEventListener('click', calculateWealth)