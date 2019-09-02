// get coordinates
window.addEventListener('load', () => {
    let long;
    let lat;

    let tempDesc = document.querySelector('.temp-desc');
    let tempDeg = document.querySelector('.temp-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    let tempWeekly = document.querySelector('.temp-weekly');

    let tempSection = document.querySelector(".deg-section");
    const tempSpan = document.querySelector(".deg-section span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;
                console.log(position);

                const proxy = 'https://cors-anywhere.herokuapp.com/';
                const api = `${proxy}https://api.darksky.net/forecast/b3914ee29d4416fc53383ab2ed2a00c7/${lat},${long}`;

                fetch(api)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        const { temperature, summary, icon } = data.currently;
                        console.log(data);

                        // set DOM elements
                        tempDeg.textContent = temperature;
                        tempDesc.textContent = summary;
                        locationTimezone.textContent = data.timezone;
                        tempWeekly.textContent = data.daily.summary;

                        //celcius
                        let celcius = (temperature - 32) * (5 / 9 );
                        //set icon
                        setIcons(icon, document.querySelector(".icon"));

                        tempSection.addEventListener('click', () =>{
                            if(tempSpan.textContent === "°F") {
                                tempSpan.textContent = "°C";
                                tempDeg.textContent = Math.floor(celcius)
                            } else {
                                tempSpan.textContent = "°F";
                                tempDeg.textContent = temperature;
                            }
                        })

                    });
            }
        );

    } else {
        h1.textContent = "Hey there, we seem to have ran into a problem, please make sure we have access to your geolocation. It's safe, trust me."
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

}); 