import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-live-devotee-report',
  templateUrl: './live-devotee-report.component.html',
  styleUrls: ['./live-devotee-report.component.css']
})
export class LiveDevoteeReportComponent implements OnInit {

  parseTime: any;
  liveInOutReportData: any;
  constructor() {

    this.parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");
    this.liveInOutReportData = [
      { date: "2018-10-07T01:39:45.156Z", online: 12, walkin: 18 },
      { date: "2018-10-07T02:39:45.156Z", online: 5, walkin: 20 },
      { date: "2018-10-07T03:39:45.156Z", online: 1, walkin: 15 },
      { date: "2018-10-07T04:39:45.156Z", online: 2, walkin: 10 },
      { date: "2018-10-07T05:39:45.156Z", online: 3, walkin: 12 },
      { date: "2018-10-07T06:39:45.156Z", online: 4, walkin: 15 },
      { date: "2018-10-07T07:39:45.156Z", online: 6, walkin: 11 },
      { date: "2018-10-07T08:39:45.156Z", online: 10, walkin: 13 },
      { date: "2018-10-07T09:39:45.156Z", online: 16, walkin: 19 },
      { date: "2018-10-07T10:39:45.156Z", online: 19, walkin: 17 },
    ];

  }

  ngOnInit() {
    this.LiveInOut(this.liveInOutReportData);
  }

  LiveInOut(data) {
    var svg = d3.select("svg"),
      margin = { top: 20, right: 80, bottom: 30, left: 50 },
      width = svg.attr("width") - margin.left - margin.right,
      height = svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleTime().range([0, width]),
      y = d3.scaleLinear().range([height, 0]),
      z = d3.scaleOrdinal()
        .range(["#03B7D3", "#F27535"]);

    var line = d3.line()
      .curve(d3.curveBasis)
      .x(function (d) { return x(d.date); })
      .y(function (d) { return y(d.numberOfPeople); });

    let inOutTimes = d3.keys(data[0]).slice(1).map((id) => {
      return {
        id: id,
        values: data.map((d) => {
          return { date: this.parseTime(d.date), numberOfPeople: d[id] };
        })
      };
    });

    console.log('inouttimes', inOutTimes);

    x.domain(d3.extent(data, (d) => { return this.parseTime(d.date); }));

    y.domain([
      d3.min(inOutTimes, function (c) { return d3.min(c.values, function (d) { return d.numberOfPeople; }); }),
      d3.max(inOutTimes, function (c) { return d3.max(c.values, function (d) { return d.numberOfPeople; }); })
    ]);

    z.domain(inOutTimes.map(function (c) { return c.id; }));

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("");

    var inOutTime = g.selectAll(".inOutTime")
      .data(inOutTimes)
      .enter().append("g")
      .attr("class", "inOutTime");

    inOutTime.append("path")
      .attr("class", "line")
      .attr("d", function (d) { return line(d.values); })
      .attr("fill","none")
      .style("stroke", function (d) { return z(d.id); });
  }

}
