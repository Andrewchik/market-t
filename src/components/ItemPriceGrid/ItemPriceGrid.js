import React, { useEffect, useState } from "react";

import { Bar, ComposedChart, Line, Tooltip, XAxis, YAxis } from "recharts";
import moment from 'moment';
import Loader from 'react-loader-spinner';

import axios from "axios";

import './ItemPriceGrid.scss'

import { HISTORY_STATS_API } from "../../constants";
import useWindowDimensions from "../../helpers/windowResizeHook";

const CustomizedAxisTick = ({ x, y, payload }) => {
    const dateTip = moment(payload.value)
        .format("l")
        .slice(0, 10);

    return (
        <g transform={`translate(${ x },${ y })`}>
            <text x={ 23 } y={ 0 } dy={ 14 } fontSize="0.90em" fontFamily="bold" textAnchor="end" fill="#363636">
                { dateTip }
            </text>
        </g>
    );
}

const CustomTooltip = ({ active, payload, label }) => {
    const formattedDate = moment(label)
        .format("l")
        .slice(0, 12);

    if (!payload.length)
        return <></>

    if (active) {
        const { payload: data } = payload[0];

        return (
            <div className="custom-tooltip">
                <p className="label-tooltip">{ `${ formattedDate }` }</p>
                <p>Sales: { data.count }</p>
                <p>Average price: { data.value.toFixed(2) }</p>
            </div>
        );
    }
    return <></>;
};

export default function ItemPriceGrid({ templateId, collection }) {
    const [data, setData] = useState([]);

    const { width } = useWindowDimensions();

    const getChartWidth = () => {
        if (width >= 1920)
            return 1024;

        const gridWidth = Math.ceil(width * 3 / 3);

        return gridWidth >= 1024 ? 1024 : gridWidth;
    }

    const getChartInterval = () => {
        if (width < 1024)
            return data.length / 3;

        return data.length <= 21 ? 3 : Math.ceil(data.length / 7);
    }

    useEffect(() => {
        axios.get(`${HISTORY_STATS_API}/price-history?template_id=${templateId}&collection=${collection}`)
            .then(({ data }) => {
                const parsedData = data.map(d => {
                    return {
                        count: d.count,
                        value: d.price,
                        date: new Date(+d.timestamp)
                    }
                });

                setData(parsedData);
            })
            .catch(e => console.log(e));
    }, [collection, templateId]);

    return (
        <>
            { data.length
                ? <div className={ 'chart-container' }>
                    <h2 className={ 'chart-header' }>Price History</h2>

                    <ComposedChart
                        width={ getChartWidth() }
                        height={ 300 }
                        data={ data }
                        margin={ { top: 5, right: 30, left: 20, bottom: 5 } }
                    >
                        <XAxis
                            dataKey="date"
                            tick={ CustomizedAxisTick }
                            interval={ getChartInterval() }
                        />
                        <YAxis
                            dataKey="value"
                            yAxisId="left"
                        />
                        <YAxis
                            dataKey="count"
                            yAxisId="right"
                            orientation="right"
                            domain={ [0, Math.max(...data.map(d => d.count))] }
                            padding={ 20 }
                        />
                        <Bar
                            dataKey="count"
                            barSize={ 20 }
                            fill="1B1C22"
                            yAxisId='right'
                            height={ 25 }
                        />

                        <Tooltip
                            content={ <CustomTooltip/> }
                            animationDuration={0}
                        />

                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="value"
                            stroke="#D69700"
                            strokeWidth={ 6 }
                        />

                        {/*<Area type="monotone" dataKey="value" stroke='#D69700' fill='#D69700'/>*/ }
                    </ComposedChart>
                </div>
                : <div className="loader">
                    <Loader type="ThreeDots" color="black" height={ 50 } width={ 50 } />
                </div>
            }
        </>
    )
}
