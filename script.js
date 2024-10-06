
window.onload = function() {
    window.scrollTo(0, 0);
};

var backToTopBtn = document.getElementById("backToTopBtn");

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function changeSeverityColor() {
    const severityElement = document.querySelector('.data-severity');
    const colors = ['#3ae374', '#ffb142', '#ff4d4d'];
    let index = 0;

    setInterval(() => {
        severityElement.style.color = colors[index];
        index = (index + 1) % colors.length;
    }, 1000);
}

changeSeverityColor();

async function fetchSolarData() {
    try {
        const response = await fetch('https://api.weather.gov/alerts/active?event=Geomagnetic%20Storm');
        const data = await response.json();

        const solarWindSpeed = data.solarWindSpeed || "No data";
        const geomagneticSeverity = data.stormSeverity || "No data";

        document.querySelector('.data').textContent = `${solarWindSpeed} km/s`;
        document.querySelector('.data-severity').textContent = geomagneticSeverity;

    } catch (error) {
        document.querySelector('.data').textContent = "Data unavailable";
        document.querySelector('.data-severity').textContent = "Data unavailable";
    }
}

fetchSolarData();
