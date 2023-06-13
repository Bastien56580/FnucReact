import "./ProfileGraph.scss"

import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import randomColor from 'randomcolor';

// Mock the graph since you don't have a backend to test with yet
import mockGraph from './mock/mockGraph.json';

export default function ProfileGraph() {
    const [myData, setMyData] = useState(mockGraph);
    useEffect(() => {
        // Axios request or fetch graph info and setMyData
        // In the meantime, we are using the mock
    }, []);


    //build the two list x and y we use for the graph from the request json
    const xData = [];
    const yData = [];
    for (const title in myData) {
        xData.push(title);
        yData.push(parseInt(myData[title]));
    }
    //make color randoms for the bar in the graph :
    const barColors = randomColor({ count: xData.length });

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title text-center">Quels sont les livres que j'ai achetés et en combien d'exemplaires ?</h5>
                    <div className="d-flex justify-content-center">
                        <div className="plot-container">
                            <Plot
                                data={[
                                    {
                                        type: 'bar',
                                        x: xData,
                                        y: yData,
                                        marker: {
                                            color: barColors,
                                        },
                                    }
                                ]}
                                layout={{
                                    autosize: true,
                                    height: 500,
                                    //remove book title from the x 
                                    xaxis: {
                                        ticktext: Array.from({ length: xData.length }, () => ""),
                                        tickvals: [],
                                        title: "Titre des livres"
                                    },
                                    yaxis: {
                                        title: "Nombre d'exemplaires acheté"
                                    },

                                }}
                                config={{
                                    responsive: true,
                                    displaylogo: false,
                                }}
                                className="w-100"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}        