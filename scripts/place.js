       function calculateWindChill(temp, windSpeed) {
        return Math.round(13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16));
    }

    const temperature = 8; 
    const windSpeed = 12; 

    document.getElementById('current-year').textContent = new Date().getFullYear();
    document.getElementById('last-modified').textContent = document.lastModified;

    window.addEventListener('DOMContentLoaded', function() {
        const windChillElement = document.getElementById('wind-chill');
        const windChillMobileElement = document.getElementById('wind-chill-mobile');

        if (temperature <= 10 && windSpeed > 4.8) {
            const windChill = calculateWindChill(temperature, windSpeed);
            const windChillText = windChill + '°C';
            
            if (windChillElement) windChillElement.textContent = windChillText;
            if (windChillMobileElement) windChillMobileElement.textContent = windChillText;
        } else {
            if (windChillElement) windChillElement.textContent = 'N/A';
            if (windChillMobileElement) windChillMobileElement.textContent = 'N/A';
        }
    });