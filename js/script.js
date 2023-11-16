document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Überprüfe die bevorzugte Farbschema-Einstellung des Benutzers
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Überprüfe, ob ein Cookie für das Farbschema vorhanden ist, andernfalls verwende die bevorzugte Einstellung
    const storedDarkModeValue = getCookie('darkModeValue');
    darkModeToggle.value = storedDarkModeValue !== null ? parseFloat(storedDarkModeValue) : prefersDarkMode ? 1 : 0;

    // Funktion zur Aktualisierung des Farbschemas und des Sliders
    function updateColorScheme() {
        const darkModeValue = darkModeToggle.value;
        body.style.backgroundColor = darkModeValue > 0.5 ? '#333' : '#fff';
        body.style.color = darkModeValue > 0.5 ? '#fff' : '#333';

        // Ändere das Symbol basierend auf dem Dark Mode Wert
        const toggleLabel = darkModeToggle.parentElement.querySelector('label');
        toggleLabel.innerHTML = darkModeValue > 0.5 ? '🌙' : '☀️';
        // Hier kannst du weitere Stiländerungen für andere Elemente hinzufügen

        // Speichere den Wert des Sliders als Cookie
        setCookie('darkModeValue', darkModeValue);
    }

    // Füge den Event Listener für Änderungen am Slider hinzu
    darkModeToggle.addEventListener('input', function () {
        updateColorScheme();
    });

    // Aktualisiere das Farbschema basierend auf der Benutzereinstellung oder dem gespeicherten Cookie
    updateColorScheme();
});

// Funktion zum Lesen eines Cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Funktion zum Setzen eines Cookies
function setCookie(name, value) {
    document.cookie = `${name}=${value}; path=/`;
}