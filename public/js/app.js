//HTML elements
const $weatherForm = document.querySelector('form');
const $search = document.querySelector('input');
const $messageOne = document.querySelector('#message-1')
const $messageTwo = document.querySelector('#message-2')
const $getLocationButton = document.querySelector('#get-location')
const url = process.env.URL;

$getLocationButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        $messageOne.textContent = 'Loading...';
        $messageTwo.textContent = '';

        fetch(`${URL}weather/location?latitude=${latitude}&longitude=${longitude}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                $messageOne.textContent = data.error;
                $messageTwo.textContent = '';
            } else {

                $messageOne.textContent = `${data.country},  ${data.region}`;
                $messageTwo.textContent = data.forecast;
            }
        });
    });


    })
})

$weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = $search.value;

    $messageOne.textContent = 'Loading...';
    $messageTwo.textContent = '';

    fetch('${URL}/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                $messageOne.textContent = data.error;
                $messageTwo.textContent = '';
            } else {

                $messageOne.textContent = data.location;
                $messageTwo.textContent = data.forecast;
            }
        });
    });

    console.log(location)
})
