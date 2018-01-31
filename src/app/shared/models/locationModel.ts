export class LocationsModel {
  constructor(
    public technicianId: string,
    public position: LatLng,
    public workOrderId: string
  ) { }
}

export class LatLng {
  constructor(
    public latitude: number,
    public longitude: number
  ){}
}
