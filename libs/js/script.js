$(document).ready(function() {

    $('#search').click(function() {

        let input = $('#input').val();
        const eraseResults = $("#display").html('');
        const eraseError = $('#error').html('');
        const inputReset = $('#input').val('');

        if (input != '') {
            $.ajax({
                url:'http://api.openweathermap.org/data/2.5/weather?q=' + input + "&units=metric" + "&appid=3e6cdca4481e6950e5a7fdf1d119f260",
                type:"POST",
                dataType:"jsonp",
                success: function(data) {
                    console.log(data);
                    let results = display(data);
                    $("#display").html(results).hide().fadeIn(400);
                    inputReset;
                    eraseError;
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR, textStatus, errorThrown);
                    $('#error').html("Oh no, this city does not exist in this universe! :(\nPerhaps you should give it another shot? ;)").hide().fadeIn(400);
                    eraseResults;

                }
            });
        }
    });

    const display = data => {
        
        // let sunrise = new Date(1000 * data.sys.sunrise).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        // let sunset = new Date(1000 * data.sys.sunset).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        // let time = new Date(data.timezone * 1000);

        return  "<div id='dataBox'>" +
                "<h3 id='dataHead'> " + data.name + ", " + data.sys.country + "</h3>" +
                "<hr/>" +
                "<h4><strong>Weather</strong>: "+ data.weather[0].main + "<img src='http://openweathermap.org/img/w/" +data.weather[0].icon+".png'>" + "</h4>" +
                "<hr/>" +
                "<h4><strong>Temperature (Current)</strong>: " + data.main.temp + "&deg;C</h4>" +
                "<h4><strong>Temperature (Min.)</strong>: " + data.main.temp_min + "&deg;C</h4>" +
                "<h4><strong>Temperature (Max.)</strong>: " + data.main.temp_max + "&deg;C</h4>" +
                "<hr/>" +
                "<h4><strong>Wind (Speed)</strong>: " + data.wind.speed + "m/s</h4>" +
                "<h4><strong>Wind (Direction)</strong>: " + data.wind.deg + "<span>&#176;</span>" + "</h4>" +
                "<hr/>" +
                "<h4><strong>Pressure</strong>: " + data.main.pressure + "hPa</h4>" +
                "<h4><strong>Humidity</strong>: " + data.main.humidity + "%</h4>" +
                "<hr/>" +
                // "<h4><strong>Time</strong>: " + time + "</h4>" +
                // "<h4><strong>Sunrise</strong>: " + sunrise + "</h4>" +
                // "<h4><strong>Sunset</strong>: " + sunset + "</h4>" +
                "<div/>";
    }
});


