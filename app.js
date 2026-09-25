const locationBtn =
    document.getElementById("locationBtn");

const locationText =
    document.getElementById("locationText");


const WORKER_URL =
    "https://YOUR-WORKER.workers.dev";


locationBtn.addEventListener("click", () => {

    if (!navigator.geolocation) {

        locationText.textContent =
            "Location is not supported by this browser.";

        return;
    }


    locationBtn.disabled = true;

    locationBtn.textContent =
        "Getting location...";


    locationText.textContent =
        "Please allow location access when your browser asks.";


    navigator.geolocation.getCurrentPosition(

        async (position) => {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            const accuracy =
                position.coords.accuracy;


            const locationData = {

                latitude,
                longitude,
                accuracy,

                timestamp:
                    new Date().toISOString()
            };


            try {

                const response =
                    await fetch(
                        WORKER_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    locationData
                                )
                        }
                    );


                if (!response.ok) {
                    throw new Error(
                        "Location upload failed"
                    );
                }


                locationText.textContent =
                    `Location detected. Accuracy: approximately ${Math.round(accuracy)} meters.`;

                locationBtn.textContent =
                    "Location shared";


                /*
                 * You can now sort/filter jobs
                 * based on latitude/longitude.
                 */

                console.log(locationData);


            } catch (error) {

                console.error(error);

                locationText.textContent =
                    "Unable to share location. Please try again.";

                locationBtn.disabled = false;

                locationBtn.textContent =
                    "Find jobs near me";
            }
        },


        (error) => {

            console.error(error);


            if (error.code === 1) {

                locationText.textContent =
                    "Location permission was denied.";

            } else {

                locationText.textContent =
                    "Unable to get your location.";
            }


            locationBtn.disabled = false;

            locationBtn.textContent =
                "Find jobs near me";
        },


        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }

    );

});
