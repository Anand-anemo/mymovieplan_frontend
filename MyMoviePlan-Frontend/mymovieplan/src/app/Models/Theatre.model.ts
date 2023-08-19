export interface Theatre{
    tid:number;
    theatreName:string;
    address:string;
    location:string;
    city:string;
    phoneno:string;
    ticket:[{
        ticketType:string;
        ticketprice:number;
        ticketSeats:number;
    }]
}