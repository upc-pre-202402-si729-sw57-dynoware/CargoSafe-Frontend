import {Component, OnInit} from '@angular/core';
import { DataService} from "../../services/data.service";

import {Chart, registerables} from "chart.js";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
Chart.register(...registerables);

@Component({
  selector: 'app-stadistics',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
  ],
  templateUrl: './stadistics.component.html',
  styleUrl: './stadistics.component.css',
})
export class StadisticsComponent implements OnInit{

    chart: any;

    constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getChartData().subscribe((response) => {
      this.loadChart(response);
    });
  }


  loadChart(chartData: any): void {
      this.createChart('load-chart-1', 'Número de pedidos por mes', chartData.chart1.labels, chartData.chart1.orders, 'rgba(75, 192, 192, 0.2)', 'rgb(75, 192, 192)');
      this.createChart('load-chart-2', 'Número de entregas por región', chartData.chart2.labels, chartData.chart2.deliveries, 'rgba(255, 159, 64, 0.2)', 'rgb(255, 159, 64)');
      this.createChart('load-chart-3', 'Tipos de carga transportada', chartData.chart3.labels, chartData.chart3.cargo, 'rgba(255, 205, 86, 0.2)', 'rgb(255, 205, 86)');
  }

  createChart(elementId: string, label: string, labels: string[], data: number[], backgroundColor: string, borderColor: string): void {
    new Chart(elementId, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 3
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
