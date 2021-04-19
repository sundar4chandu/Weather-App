import { ICurrent } from "./i-current";

export interface IForecast       

{
  cod: string,
  message: number,
  cnt: number,
  list: ICurrent[]
city: {
    id: number,
    name: string,
    coord: {
      lat: number,
      lon: number
    },
    country: string,
    timezone: number,
    sunrise: number,
    sunset: number
  }
}
        

    
