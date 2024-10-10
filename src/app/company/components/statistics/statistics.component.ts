import { Component, OnInit } from '@angular/core';
import { StatisticsResponse, StadisticsService } from "../../services/stadistics.service";
import { MatGridList, MatGridTile } from "@angular/material/grid-list";
import { StatisticsEntity } from "../../model/statistics.entity";
import { Chart, registerables } from 'chart.js';
import {MatCard, MatCardContent, MatCardFooter, MatCardTitle} from "@angular/material/card";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    MatGridList,
    MatGridTile,
    MatCard,
    MatCardContent,
    TranslateModule,
    MatCardTitle,
    MatCardFooter,

  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  chart: any;

  constructor(private statisticsService: StadisticsService, private translate: TranslateService) {
    Chart.register(...registerables);
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.statisticsService.getStatisticsData().subscribe((response: StatisticsResponse[]) => {
      if (response && response.length > 0) {
        const statistics = new StatisticsEntity(response[0].data); // Crear una nueva instancia de StatisticsEntity
        this.loadChart(statistics.data); // Accede a los datos
      }

    });
  }

  loadChart(chartData: any): void {
    this.createVerticalBarChart('vertical-chart-1', '', chartData.chart1.labels, chartData.chart1.orders, [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)'],
      ['rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)']);
    this.createVerticalBarChart('vertical-chart-2', '', chartData.chart2.labels, chartData.chart2.profits, [
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)',
      'rgba(179, 117, 11, 0.2)'],
      ['rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
        'rgb(179, 117, 11)']);
    this.createHorizontalBarChart('horizontal-chart', '', chartData.chart4.labels, chartData.chart4.orders, [
      'rgba(214, 130, 112, 0.2)',
      'rgba(214, 181, 112, 0.2)',
      'rgba(196, 214, 112, 0.2)',
      'rgba(145, 214, 112, 0.2)',
      'rgba(112, 214, 181, 0.2)'],
      ['rgb(214, 130, 112)',
      'rgb(214, 181, 112)',
      'rgb(196, 214, 112)',
      'rgb(145, 214, 112)',
      'rgb(112, 214, 181)'
    ]);
    this.createPieChart('pie-chart', '', chartData.chart3.labels, chartData.chart3.orders, ['rgb(54, 162, 235)',
      'rgb(255, 205, 86)']);
    this.createLineChart('line-chart', '', chartData.chart5.labels, chartData.chart5.costs, 'rgb(75, 192, 192)');
    this.createRadarChart('radar-chart', '', chartData.chart6.labels, chartData.chart6.orders, 'rgba(130, 112, 214  , 0.2)', 'rgb(130, 112, 214)');
  }

  createVerticalBarChart(
    elementId: string,
    label: string,
    labels: string[],
    data: number[],
    backgroundColor: string[],
    borderColor: string[]
  ): void {
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
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  createHorizontalBarChart(
    elementId: string,
    label: string,
    labels: string[],
    data: number[],
    backgroundColor: string[],
    borderColor: string[]
  ): void {
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
            borderWidth: 3,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  createPieChart(
    elementId: string,
    label: string,
    labels: string[],
    data: number[],
    backgroundColor: string[],
  ): void {
    new Chart(elementId, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: backgroundColor,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  createLineChart(elementId: string, label: string, labels: string[], data: number[],borderColor: string): void {
    new Chart(elementId, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            borderColor: borderColor,
            tension: 0.1
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  createRadarChart(elementId: string, label: string, labels: string[], data: number[], backgroundColor: string, borderColor: string): void {
    new Chart(elementId, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [
          {
            label: label,
            data: data,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

}
