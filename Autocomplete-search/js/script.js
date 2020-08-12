const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search states.json and filter it
const searchStates = async text =>{
    const res = await fetch(' ../data/states.json');
    const data = await res.json();
    
    // get match to current text input
    let matches = data.filter(state => {
        const regex = new RegExp(`^${text}`,'gi');
        return state.name.match(regex) || state.abbr.match(regex);
    });
    if(text.length === 0){
        matches = [];
        matchList.innerHTML = '';
    }

    outputHTML(matches);
}

const outputHTML = matches =>{
    if(matches.length >0){
        const html = matches.map(match => `
        <div class='card card-body mb-4'>
        <h4>${match.name} (${match.abbr}) <span class='text-primary'>${match.capital}</span></h4>
        <small>Lat: ${match.lat} Long: ${match.long}</small>
        </div>
        `).join('');
        matchList.innerHTML = html;
    }
}

search.addEventListener('input', () => searchStates(search.value));