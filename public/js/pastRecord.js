require('dotenv').config();
const API_SERVER = process.env.API_SERVER;
const isLocalhost =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1';
const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:4000`
    : API_SERVER;
window.addEventListener('DOMContentLoaded', function () {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    fetch(`${STORAGE_API_HOST}/pastRecord`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken + ' ' + refreshToken,
        },
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            //token expired
            if (response.error === 'TokenExpiredError Not authorized') {
                alert(
                    'Token is expired. Please re-login to access user information'
                );
                localStorage.removeItem('accessToken');
                window.location.href = '/';
            } else {
                console.log('No token issue!!!!!!!!');
                if (response.recordsSet == null) {
                    alert('You dont have any past record yet!');
                }
                drawGraph(response.recordsSet);
            }
        })
        .catch((error) => {
            alert(error);
            window.location.href = '/';
        });

    // set the dimensions and margins of the graph
    var margin = { top: 50, right: 50, bottom: 80, left: 100 },
        width =
            document.getElementById('graphContainer').offsetWidth -
            margin.left -
            margin.right,
        height =
            document.getElementById('graphContainer').offsetHeight -
            margin.top -
            margin.bottom;

    // parse the date / time
    var xFormat = '%d-%b-%Y';
    var parseTime = d3.timeParse('%d/%m/%Y');

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3
        .line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.score);
        });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3
        .select('#graphContainer')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Get the data
    function drawGraph(data) {
        // format the data
        data.forEach(function (d) {
            d.date = parseTime(d.date);
            d.score = +d.score;
        });

        // Scale the range of the data
        x.domain(
            d3.extent(data, function (d) {
                return d.date;
            })
        );
        y.domain([
            0,
            d3.max(data, function (d) {
                return d.score;
            }),
        ]);

        // Add the valueline path.
        svg.append('path')
            .data([data])
            .attr('class', 'line')
            .attr('d', valueline);

        // Add the x Axis
        svg.append('g')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat(xFormat)))
            .append('text')
            .attr('class', 'axis-title')
            .attr('x', width + 15)
            .attr('dx', '2em')
            .style('text-anchor', 'end')
            .attr('fill', '#5D6971')
            .text('Time')
            .style('font-size', '15px');

        // Add the y Axis
        svg.append('g')
            .call(d3.axisLeft(y))
            .append('text')
            .attr('class', 'axis-title')
            .attr('y', -40)
            .attr('dy', '2em')
            .style('text-anchor', 'end')
            .attr('fill', '#5D6971')
            .text('Score')
            .style('font-size', '15px');
    }
});
