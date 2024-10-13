import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { TripEntity } from "../../model/trip.entity";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MapComponent} from "../../../request-service/component/map/map.component";
import {MatDialog} from "@angular/material/dialog";
import {MatOption, MatSelect} from "@angular/material/select";
import {
  DialogSuccessfullyComponent
} from "../../../public/components/dialogs/dialog-successfully/dialog-successfully.component";

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatLabel,
    MatFormField,
    MatInput,
    FormsModule,
    MatButton,
    NgIf,
    MatCardTitle,
    MatError,
    MatIcon,
    MatIconButton,
    MatSelect,
    MatOption,
    NgForOf
  ],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent {
  @Input() trip: TripEntity = new TripEntity({});
  @Input() editMode: boolean = false;
  @Output() tripAddRequested = new EventEmitter<TripEntity>();
  @Output() tripUpdateRequested = new EventEmitter<TripEntity>();
  @Output() cancelRequested = new EventEmitter();
  @ViewChild('tripForm', { static: false }) tripForm!: NgForm;

  departments = ['Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca', 'Callao', 'Cusco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad', 'Lambayeque', 'Lima', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali'];

  districts: string[] = [];

  selectedDepartment: string = '';

  departmentDistrictMap: { [key: string]: string[] } = {
    'Amazonas': ['Chachapoyas', 'Bagua', 'Bongará', 'Condorcanqui', 'Luya', 'Rodríguez de Mendoza', 'Utcubamba'],
    'Áncash': ['Huaraz', 'Aija', 'Antonio Raymondi', 'Asunción', 'Bolognesi', 'Carhuaz', 'Carlos Fermín Fitzcarrald', 'Casma', 'Corongo', 'Huari', 'Huarmey', 'Huaylas', 'Mariscal Luzuriaga', 'Ocros', 'Pallasca', 'Pomabamba', 'Recuay', 'Santa', 'Sihuas', 'Yungay'],
    'Apurímac': ['Abancay', 'Andahuaylas', 'Antabamba', 'Aymaraes', 'Cotabambas', 'Chincheros', 'Grau'],
    'Arequipa': ['Arequipa', 'Camana', 'Caraveli', 'Castilla', 'Caylloma', 'Condesuyos', 'Islay', 'La Union'],
    'Ayacucho': ['Huamanga', 'Cangallo', 'Huanca Sancos', 'Huanta', 'La Mar', 'Lucanas', 'Parinacochas', 'Páucar del Sara Sara', 'Sucre', 'Víctor Fajardo', 'Vilcas Huamán'],
    'Cajamarca': ['Cajamarca', 'Cajabamba', 'Celendín', 'Chota', 'Contumazá', 'Cutervo', 'Hualgayoc', 'Jaén', 'San Ignacio', 'San Marcos', 'San Miguel', 'San Pablo', 'Santa Cruz'],
    'Callao': ['Callao'],
    'Cusco': ['Cusco', 'Acomayo', 'Anta', 'Calca', 'Canas', 'Canchis', 'Chumbivilcas', 'Espinar', 'La Convención', 'Paruro', 'Paucartambo', 'Quispicanchi', 'Urubamba'],
    'Huancavelica': ['Huancavelica', 'Acobamba', 'Angaraes', 'Castrovirreyna', 'Churcampa', 'Huaytará', 'Tayacaja'],
    'Huánuco': ['Huánuco', 'Ambo', 'Dos de Mayo', 'Huacaybamba', 'Huamalíes', 'Leoncio Prado', 'Marañón', 'Pachitea', 'Puerto Inca', 'Lauricocha', 'Yarowilca'],
    'Ica': ['Ica', 'Chincha', 'Nazca', 'Palpa', 'Pisco'],
    'Junín': ['Huancayo', 'Concepción', 'Chanchamayo', 'Jauja', 'Junín', 'Satipo', 'Tarma', 'Yauli', 'Chupaca'],
    'La Libertad': ['Trujillo', 'Ascope', 'Bolívar', 'Chepén', 'Julcán', 'Otuzco', 'Pacasmayo', 'Pataz', 'Sánchez Carrión', 'Santiago de Chuco', 'Gran Chimú', 'Virú'],
    'Lambayeque': ['Chiclayo', 'Ferreñafe', 'Lambayeque'],
    'Lima': ['Lima', 'Barranca', 'Cajatambo', 'Canta', 'Cañete', 'Huaral', 'Huarochirí', 'Huaura', 'Oyón', 'Yauyos'],
    'Loreto': ['Maynas', 'Alto Amazonas', 'Datem del Marañón', 'Loreto', 'Mariscal Ramón Castilla', 'Putumayo', 'Requena', 'Ucayali'],
    'Madre de Dios': ['Tambopata', 'Manu', 'Tahuamanu'],
    'Moquegua': ['Mariscal Nieto', 'General Sánchez Cerro', 'Ilo'],
    'Pasco': ['Pasco', 'Daniel Alcides Carrión', 'Oxapampa'],
    'Piura': ['Piura', 'Ayabaca', 'Huancabamba', 'Morropón', 'Paita', 'Sechura', 'Sullana', 'Talara'],
    'Puno': ['Puno', 'Azángaro', 'Carabaya', 'Chucuito', 'El Collao', 'Huancané', 'Lampa', 'Melgar', 'Moho', 'San Antonio de Putina', 'San Román', 'Sandia', 'Yunguyo'],
    'San Martín': ['Moyobamba', 'Bellavista', 'El Dorado', 'Huallaga', 'Lamas', 'Mariscal Cáceres', 'Picota', 'Rioja', 'San Martín', 'Tocache'],
    'Tacna': ['Tacna', 'Candarave', 'Jorge Basadre', 'Tarata'],
    'Tumbes': ['Tumbes', 'Contralmirante Villar', 'Zarumilla'],
    'Ucayali': ['Coronel Portillo', 'Atalaya', 'Padre Abad', 'Purús']
  };

  constructor(private dialog: MatDialog) {}


  selectedCountry(){

  }
  onDepartmentChange() {
    this.districts = this.departmentDistrictMap[this.selectedDepartment] || [];
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.setLocation(position),
        (error) => console.error("Error fetching location: ", error)
      );
    } else {
      console.error("Geolocation not supported by this browser");
    }
  }
  private setLocation(position: GeolocationPosition) {
    if (position && position.coords) {
      const { latitude, longitude } = position.coords;
      this.trip.unload_location = `Lat: ${latitude}, Lon: ${longitude}`;
      console.log("Location stored:", this.trip.unload_location);
    } else {
      console.error("Invalid position object");
    }
  }
  onSubmit() {
    if (this.tripForm.valid) {
      this.trip.unload_date = new Date().toISOString();
      this.trip.department = this.selectedDepartment;
      const emitter = this.editMode ? this.tripUpdateRequested : this.tripAddRequested;
      emitter.emit(this.trip);
      this.resetEditState();
      this.openSuccessDialog('Agregado satisfactoriamente');
    } else {
      console.error("Invalid Data");
    }
  }

  openSuccessDialog(message: string): void {
    this.dialog.open(DialogSuccessfullyComponent, {
      data: { message }
    });
  }
  onCancel() {
    this.cancelRequested.emit();
    this.resetEditState();
  }

  resetEditState() {
    this.trip = new TripEntity({});
    this.editMode = false;
    this.tripForm.resetForm();
  }

  getLatitude(destination: string): string {
    const latMatch = destination.match(/Lat:\s*(-?\d+(\.\d+)?)/);
    return latMatch && latMatch[1] ? latMatch[1] : 'undefined';
  }

  getLongitude(destination: string): string {
    const lngMatch = destination.match(/Lon:\s*(-?\d+(\.\d+)?)/);
    return lngMatch && lngMatch[1] ? lngMatch[1] : 'undefined';
  }
}
