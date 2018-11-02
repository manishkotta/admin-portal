import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-darshan-report',
  templateUrl: './darshan-report.component.html',
  styleUrls: ['./darshan-report.component.css']
})
export class DarshanReportComponent implements OnInit {

  darshanReportData: any[];
  constructor(private reportService: ReportsService) {
    this.darshanReportData = [
      { date: "10/11/2006", online: 10, walkin: 15 },
      { date: "11/10/2007", online: 12, walkin: 18 },
      { date: "10/11/2008", online: 5, walkin: 20 },
      { date: "10/11/2009", online: 1, walkin: 15 },
      { date: "10/12/2010", online: 2, walkin: 10 },
      { date: "10/11/2011", online: 3, walkin: 12 },
      { date: "10/11/2012", online: 4, walkin: 15 },
      { date: "10/11/2013", online: 6, walkin: 11 },
      { date: "10/12/2014", online: 10, walkin: 13 },
      { date: "10/01/2015", online: 16, walkin: 19 },
      { date: "10/02/2016", online: 19, walkin: 17 },
    ];
  }

  ngOnInit() {
    this.darshanReport(this.darshanReportData);
    this.reportService.getDarshanReport();
  }

  darshanReport(data) {
    var svg = d3.select("svg"),
      margin = { top: 20, right: 20, bottom: 50, left: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr('class', 'mainG').attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parse = d3.timeParse("%d/%m/%Y");

    var mainKey = "date";
    var keys = ["online", "walkin"];

    var z = d3.scaleOrdinal()
      .range(["#03B7D3", "#F27535"]);

    z.domain(d3.keys(data[0]).filter(function (key) { return key !== "Year"; }));

    data.forEach(function (d) {
      d.date = parse(d.date);
      d.total = d3.keys(d).filter((s) => s !== "date").map((y) => d[y]).reduce((a, b) => a + b);
    });

    var x = d3.scaleBand()
      .rangeRound([0, width], .05).padding(0.1);

    var y = d3.scaleLinear()
      .rangeRound([height, 0]);


    data.sort(function (a, b) { return b.total - a.total; });
    x.domain(data.map(function (d) { return d[mainKey]; }));
    y.domain([0, d3.max(data, function (d) { return d.total; })]).nice();

    var stackedData = d3.stack().keys(keys)(data);

    g.append("g")
      .selectAll("g")
      .data(stackedData)
      .enter().append("g")
      .attr("fill", function (d) { return z(d.key); })
      .selectAll("rect")
      .data(function (d) { return d; })
      .enter().append("rect")
      .attr("x", function (d) { return x(d.data[mainKey]); })
      .attr("y", function (d) { return y(d[1]); })
      .attr("height", function (d) { return y(d[0]) - y(d[1]); })
      .attr("width", x.bandwidth())
      .on("mouseover", function (d) {
        // div.transition()
        //     .duration(200)
        //     .style("opacity", .9);
        // div.html(tooltip(d.data))
        //     .style("left", (d3.event.pageX) + "px")
        //     .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function (d) {
        // div.transition()
        //     .duration(500)
        //     .style("opacity", 0);
      });

    g.append("g")
      .attr("class", "xaxis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%d %b")))
      .selectAll("text")
    // .attr("y", 0)
    // .attr("x", 9)
    // .attr("dy", ".35em")
    // .style("text-anchor", "start");

    g.append("g")
      .attr("class", "yaxis")
      .call(d3.axisLeft(y).tickSize(-width))
      .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.2em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("");

    var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
      .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function (d) { return d; });
  }

}
