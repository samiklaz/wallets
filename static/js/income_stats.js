const renderChart = (data, labels) => {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: "doughnut",
        data : {
            labels: labels,
            datasets: [{
                label: "Last 6 Months Income",
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 232, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 232, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
        },
        options: {
            title: {
                display: true,
                text: 'Income Per Category'
            },
            
        },

    });
};

const getChartData = () => {
    fetch('/income/income_category_summary').then((res) => res.json()).then((results) => {
        console.log("results", results);
        const category_data = results.income_category_data;
        const [labels, data] = [Object.keys(category_data), Object.values(category_data),];
        console.log(data);
        console.log(labels);

        renderChart(data, labels);
    })
}

document.onload = getChartData();