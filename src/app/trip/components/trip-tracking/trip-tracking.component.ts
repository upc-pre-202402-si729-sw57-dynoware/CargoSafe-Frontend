import {Component, inject, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatLabel} from "@angular/material/form-field";
import {MatList, MatListItem} from "@angular/material/list";
import {Merchandise} from "../../../merchandise/model/merchandise.entity";
import {TripService} from "../../service/trip.service";
import {MerchandiseService} from "../../../merchandise/services/merchandise.service";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-trip-tracking',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatLabel,
    MatList,
    MatListItem,
    MatCardTitle,
    MatButtonToggle,
    MatGridList,
    MatGridTile,
    MatIcon
  ],
  templateUrl: './trip-tracking.component.html',
  styleUrl: './trip-tracking.component.css'
})
export class TripTrackingComponent implements OnInit{
  protected merchandise: Merchandise=new Merchandise();
  private tripsApi: TripService = inject(TripService);
  private merchandiseApi: MerchandiseService = inject(MerchandiseService);
  protected id:number=2;
  protected isStep1Complete = true;
  protected isStep2Complete = true;
  protected isStep3Complete = true;
  protected isStep4Complete = true;
  protected isStep5Complete = true;
  ngOnInit(): void {
    this.merchandiseApi.getById(this.id).subscribe((data: any) => {
      this.merchandise=data;

    });

    this.tripsApi.getById(this.id).subscribe((data2: any) => {
      this.merchandise.product=data2.name;
    })
  }
}
