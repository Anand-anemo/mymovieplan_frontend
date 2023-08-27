import { Shows } from "./Shows.model";

export interface Theatre{
    
    tid:number;
    theatreName:string;
    address:string;
    location:string;
    city:string;
    phoneno:string;
    seatCapacity:number
    shows: Shows[];
   
}