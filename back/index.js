const fs = require('fs');
const echarts = require('echarts');
const svg2img = require('svg2img');

const chart = echarts.init(null, 'shine', {
    renderer: 'svg', // must use SVG rendering mode
    ssr: true, // enable SSR
    width: 400, // need to specify height and width
    height: 300
});
const colors = ['#5470C6', '#EE6666'];
// use setOption as normal
chart.setOption(

    {
        color: colors,
        tooltip: {
            trigger: 'none',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {},
        grid: {
            top: 70,
            bottom: 50
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return (
                                'Precipitation  ' +
                                params.value +
                                (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                            );
                        }
                    }
                },
                // prettier-ignore
                data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
            },
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return (
                                'Precipitation  ' +
                                params.value +
                                (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                            );
                        }
                    }
                },
                // prettier-ignore
                data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Precipitation(2015)',
                type: 'line',
                xAxisIndex: 1,
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
                data: [
                    2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                ]
            },
            {
                name: 'Precipitation(2016)',
                type: 'line',
                smooth: true,
                emphasis: {
                    focus: 'series'
                },
                data: [
                    3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7
                ]
            }
        ]
    }
//     {
//     title: {
//         text: 'ECharts Getting Started Example'
//     },
//     tooltip: {},
//     legend: {
//         data: ['sales']
//     },
//     xAxis: {
//         data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
//     },
//     yAxis: {},
//     series: [
//         {
//             name: 'sales',
//             type: 'bar',
//             data: [5, 20, 36, 10, 10, 20]
//         }
//     ],animation: false
// }
);
// Render chart to SVG string
const svgStr = chart.renderToSVGString();
chart.dispose();

svg2img(svgStr, {
    resvg: {
        fitTo: {
            mode: 'width', // or height
            value: 1200,
        },
    }
},function(error, buffer) {
    if (error) {
        console.error('Error converting SVG to PNG:', error);
        return;
    }

    // Save PNG buffer to file
    fs.writeFile('bar.png', buffer, function(err) {
        if (err) {
            console.error('Error writing PNG file:', err);
            return;
        }
        console.log('PNG file saved successfully.');
    });
});


