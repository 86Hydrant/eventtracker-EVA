var numToString = function (num) {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
};

var yearChange = function (year) {
    if (year === 119) {
        return 2019;
    } else if (year === 120) {
        return 2020;
    }
};

var timeString = '';

var dateChanger = function (apiDate) {
    var date = new Date(apiDate);

    var year = date.getYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minutes = date.getMinutes();

    timeString = numToString(day) + '-' + numToString(month) + '-' +
        yearChange(year) + ' ' + numToString(hour) + ":" + numToString(minutes);
}

var city = '';
var input = document.getElementById("nameCity");


input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter"
    if (event.keyCode === 13) {
        city = document.getElementById("nameCity").value;
        document.getElementById("band-section").innerHTML = null;
        fetch("https://www.eventbriteapi.com/v3/events/search/?sort_by=date&location.address=" + city + "&categories=103&token=33DPELM3CGFY27D5P3JG")
            .then(function (response) {
                return response.json()
            })
            .then(function (response) {
                console.log(response.events);
                response.events.forEach(function (event) {
                    dateChanger(event.start.local);
                    html = `
                    <ul class="band-list">
                    <li class="band-item"><a href="${event.url}" target="_blank">${event.name.text}</a><br>
                    <p>${timeString}</p><br></li>
                    </ul>
            `
                    document.getElementById("band-section").innerHTML += html;

                })
                events = response.events;
            })

    }
});
