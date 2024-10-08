export class DriverEntity {
  id: number;
  name: string;
  dni: string;
  phone: string;
  license: string;

  constructor(driver: { id?: number; name?: string; dni?: string; phone?: string; license?: string }) {
    this.id = driver.id || 0;
    this.name = driver.name || '';
    this.dni = driver.dni || '';
    this.phone = driver.phone || '';
    this.license = driver.license || '';
  }
}
