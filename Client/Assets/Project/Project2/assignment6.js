            var apiKey = "d009bd6c814ec4bea91da3100809c9a8";
            var searchKey = "";
            var searchKey1 = "";
            $(document).ready(function() {
                $("#submit").click(function(){
                var location = $("#location").val();
                var lat = $("#lat").val();
                var lon = $("#lon").val();

                if(!isNaN(location)){
                    searchKey = "lat"
                    searchKey1 ="lon" 
                } else{
                    searchKey = "q"
                    searchKey1 = ""
                }

                if(location != ""){
                    $.ajax({
                        url: 'http://api.openweathermap.org/data/2.5/weather?' + 
                        searchKey + '=' + location + '&units=metric&appid=' + apiKey,
                        dataType:"jsonp", 
                        type:"GET",
                        success: function(data){
                            var result = outputData(data);
                            $("#outputData").html(result);
                            $("#outputData").val('');
                        }

                    })
                } else {
                    $.ajax({
                        url: 'http://api.openweathermap.org/data/2.5/weather?' + 
                        searchKey + '=' + lat + '&' + searchKey1 + '=' + lon + '&units=metric&appid=' + apiKey,
                        dataType:"jsonp", 
                        type:"GET",
                        success: function(data){
                            var result = outputData(data);
                            $("#outputData").html(result);
                            $("#outputData").val('');
                        }
                    })
                }
            })
        })

            function outputData(data){
                return "<div><h2>Weather in " + data.name + "</h2>" +
                    "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' width=150px>" +
                    "<h4> Weather: " + data.weather[0].main + "<br><br>" + 
                        "Description: " + data.weather[0].description + "<br><br>" + 
                        "Temperature: " + data.main.temp + "C <br><br>" + 
                        "High Temp: " + data.main.temp_max + "C <br><br>" +
                        "Low Temp: " + data.main.temp_min + "C <br><br>" +
                        "Pressure: " + data.main.pressure + "hPa <br><br>" +
                        "Humidity: " + data.main.humidity + "%<br><br>" + 
                        "Visibility: " + data.visibility + "meters <br><br>" + 
                        "Wind Speed: " + data.wind.speed + " m/sec <br><br>" +
                        "Wind Direction: " + data.wind.deg + " degrees </h4></div>";
            }