import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-live-devotee-in-out',
  templateUrl: './live-devotee-in-out.component.html',
  styleUrls: ['./live-devotee-in-out.component.css']
})
export class LiveDevoteeInOutComponent implements OnInit {

  parseTime: any;
  liveReportGroup: any[];
  constructor(private reportService: ReportsService) {

    this.parseTime = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");
    this.liveReportGroup = [
      { date: "2018-10-07T01:39:45.156Z", completed: 12, inside: 18 },
      { date: "2018-10-07T02:39:45.156Z", completed: 5, inside: 20 },
      { date: "2018-10-07T03:39:45.156Z", completed: 1, inside: 15 },
      { date: "2018-10-07T04:39:45.156Z", completed: 2, inside: 10 },
      { date: "2018-10-07T05:39:45.156Z", completed: 3, inside: 12 },
      { date: "2018-10-07T06:39:45.156Z", completed: 4, inside: 15 },
      { date: "2018-10-07T07:39:45.156Z", completed: 6, inside: 11 },
      { date: "2018-10-07T08:39:45.156Z", completed: 10, inside: 13 },
      { date: "2018-10-07T09:39:45.156Z", completed: 16, inside: 19 },
      { date: "2018-10-07T10:39:45.156Z", completed: 19, inside: 17 },
    ];

  }

  ngOnInit() {
    this.reportService.getLiveInOutReport().subscribe(
      result => {
        if (result.status === 200)
          this.initReport(result)
      },
      err => {
        console.log(err);
      }
    );
  }


  initReport(data) {
    var svg = d3.select("svg"),
      margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xData = data.labels || [];
    var yData = data.data || [];

    var x0 = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.1);

    var x1 = d3.scaleBand()
      .padding(0.05);

    var y = d3.scaleLinear().range([height, 0]),
      z = d3.scaleOrdinal()
        .range(["#03B7D3", "#F27535"]);

    var keys = ["online", "walkin"];

    let yDataModified = [];

    for (var i = 0; i < yData[0].length && i < yData[1].length; i++) {
      let o = {
        date: xData[i],
        "online": parseInt(yData[0][i]) + i,
        "walkin": parseInt(yData[1][i]) + i
      }
      yDataModified.push(o);
    }

    console.log(yDataModified, "ymodified");
    x0.domain(xData.map(function (d) { return d; }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(yDataModified, function (d) { return d3.max(keys, function (key) { return d[key]; }); })]).nice()

    g.append("g")
      .selectAll("g")
      .data(yDataModified)
      .enter().append("g")
      .attr("transform", function (d) { return "translate(" + x0(d.date) + ",0)"; })
      .selectAll("rect")
      .data(function (d) { return keys.map(function (key) { return { key: key, value: d[key] }; }); })
      .enter().append("rect")
      .attr("x", function (d) { return x1(d.key); })
      .attr("y", function (d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function (d) { return height - y(d.value); })
      .attr("fill", function (d) { return z(d.key); });

    g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x0).ticks(10));

    g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
      .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("Total No. of Devotees");

    var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter().append("g")
      .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
      .attr("x", width + 5)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

    legend.append("text")
      .attr("x", width + 5)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function (d) { return d; });

  }

  updateReport() {

  }

}
