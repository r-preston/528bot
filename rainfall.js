/*
** To use, call Rainfall.get_rain_data(location_string, callback)
** It takes two arguments:
**     location_string is the name of the place you want weather for.
**     callback is a function that will be passed the results.
**       Results are passed to callback() as an array of strings, with
**       each array element being one line of output
*/
class Rainfall
{
    static #generate_query = function(location, type)
    {
        // API key is limited to 60 API calls per minute
        // It is also limited to an unknown total number of
        // calls, after which we'll have to make a new account
        const api_key = "cc847f74416f10fb21140c0f01cbd208";
        // not necessary for this API
        const proxy = "https://cors-anywhere.herokuapp.com";
        // API base url
        const base_url = "https://api.openweathermap.org/data/2.5"

        if(type === 'forecast')
        {
            // shock horror, gets a forecast
            return `${base_url}/forecast?id=${location}&units=metric&appid=${api_key}`

        }
        else
        {
            // gets current weather
            return `${base_url}/weather?q=${location},,GB&units=metric&appid=${api_key}`;
        }
    }

    static #sum = function(arr, start, end)
    {
        // sum items in array from indicies {start} to {end-1}
        var sub_arr = arr.slice(start, end);
        var total = sub_arr.reduce((total, amount) => total + amount);
        return Math.round(10*total)/10; // round to 1dp
    }

    static get_rain_data = function(location_string, callback)
    {
        // output_text is array of output lines
        var output_text = [];

        // get JSON from API
        fetch(this.#generate_query(location_string), {
            method:'GET'
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data.cod > 299 || data.cod < 200)
            {
                // 2XX codes are success, everything else bad
                throw(data);
            }
            output_text.push(`Found data for ${data.name}, ${data.sys.country}.`);
            output_text.push(`Current weather is ${data.weather[0].description}, ${Math.round(22.37*data.wind.speed)/10}mph wind.`);

            // get past rainfall
            // if no rain in past 3 hours don't need to say there wasn't any in last hour either
            data.rain = data.rain === undefined ? {} : data.rain;
            data.rain['1h'] = data.rain['1h'] === undefined ? 0 : data.rain['1h'];
            data.rain['3h'] = data.rain['3h'] === undefined ? 0 : data.rain['3h'];
            if(data.rain['3h'] === 0)
            {
                output_text.push("No rain in the last 3 hours");
            }
            else
            {
                output_text.push(`${data.rain['3h']}mm of rain in the last 3 hours`);
                if(data.rain['1h'] === 0)
                {
                    output_text.push("No rain in the last hour");
                }
                else
                {
                    output_text.push(`${data.rain['1h']}mm of rain in the last hour`);
                }
            }

            // data.id to get weather forecast at same place as current weather
            fetch(this.#generate_query(data.id, 'forecast'), {
                method:'GET'
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.cod > 299 || data.cod < 200)
                {
                    throw(data)
                }

                // rain is mm of rain for next 5 days in 3 hour chunks
                var rain_forecast = data.list.map(x => (x.rain === undefined) ? 0 : x.rain['3h']);

                // these are the chosen intervals, in ascending length order
                // array for easy customisation
                var rain_forecast_intervals =
                [
                    ["3 hours",  this.#sum(rain_forecast,0,1)],
                    ["6 hours",  this.#sum(rain_forecast,0,2)],
                    ["24 hours", this.#sum(rain_forecast,0,8)],
                    ["2 days",   this.#sum(rain_forecast,0,16)],
                    ["5 days",   this.#sum(rain_forecast,0,40)]
                ];
                var rain_forecast_messages = [];

                // if for example no rain in next 2 days, don't need to say there won't be any in smaller
                // timesteps either. this lop enforces that logic so no unecessary info is printed
                for(var k = rain_forecast_intervals.length - 1; k >= 0; k--)
                {
                    if(rain_forecast_intervals[k][1] === 0)
                    {
                        rain_forecast_messages.push("No rain forecast for the next "+rain_forecast_intervals[k][0]);
                        break;
                    }
                    else
                    {
                        rain_forecast_messages.push(`${rain_forecast_intervals[k][1]}mm of rain forecast for the next ${rain_forecast_intervals[k][0]}`);
                    }
                }
                // reverse because loop looked in descending order and we want to print ascending
                output_text = output_text.concat(rain_forecast_messages.reverse());

                // send output to callback()
                callback(output_text);
            });

        })
        .catch((err) => {
            // send error message to console and user
            console.log(`${err.cod}: ${err.message}`)
            callback([`Server returned ${err.cod}: ${err.message}`]);
        });
    }
}
