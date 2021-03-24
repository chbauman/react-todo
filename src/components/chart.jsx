import React, { useEffect, useState } from "react";
import {
  select,
  line,
  curveCardinal,
  axisBottom,
  scaleLinear,
  axisRight,
} from "d3";

const init_circles = [0, 31, 12, 13, 5, 15, 27, 31, 23, 12, 100];
const max_val = 100;
const svg_heigth = 150;

function Chart() {
  const [data, setData] = useState(init_circles);

  useEffect(() => {
    const svg = select("#other_chart");
    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);
    const yScale = scaleLinear().domain([0, max_val]).range([svg_heigth, 0]);

    const xAxis = axisBottom(xScale);
    svg.select(".x-axis").call(xAxis);
    const yAxis = axisRight(yScale);
    svg.select(".y-axis").call(yAxis);

    const myLine = line()
      .x((v, i) => xScale(i))
      .y((v) => yScale(v))
      .curve(curveCardinal);
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", (v) => myLine(v))
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  useEffect(() => {
    const svg = select("#chart");
    svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", (value) => value)
      .attr("cx", (value) => value * 3)
      .attr("cy", (value) => value * 3)
      .attr("stroke", "red");
  }, [data]);

  return (
    <div className="m-2">
      <h2>The Chart</h2>
      <svg id="other_chart" height={svg_heigth}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </svg>
      <br />
      <svg id="chart"></svg>
      <br />
      <button
        onClick={() => setData(data.map((v) => v + 5))}
        className="btn btn-primary m-2"
      >
        Update
      </button>
      <button
        onClick={() => setData(data.filter((v) => v < max_val))}
        className="btn btn-primary m-2"
      >
        Filter
      </button>
      <button
        onClick={() => {
          setData(data.concat([Math.floor(Math.random() * max_val)]));
        }}
        className="btn btn-primary m-2"
      >
        Add
      </button>
    </div>
  );
}

export default Chart;
