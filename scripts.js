function placeBet(sport) {
    alert(`You have placed a bet on ${sport}!`);
    // Add your betting logic here
}

async function loadLiveOdds() {
    const apiKey = 'cc5975d5fa1405e95b871fccb4cabdf1';
    const sport = 'upcoming';
    const region = 'us';
    const market = 'h2h';

    const url = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${apiKey}&regions=${region}&markets=${market}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch odds');
        const data = await response.json();

        const container = document.querySelector('.live-odds');
        container.innerHTML = '';

        data.slice(0, 3).forEach(match => {
            const teams = match.teams.join(' vs ');
            const odds = match.bookmakers[0]?.markets[0]?.outcomes.map(o => `${o.name}: ${o.price}`).join(' / ') || 'No odds';

            const div = document.createElement('div');
            div.className = 'live-odd';
            div.innerHTML = `
                <h3>${teams}</h3>
                <p><strong>Odds:</strong> ${odds}</p>
                <button>View Details</button>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Error loading odds:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadLiveOdds();
});
