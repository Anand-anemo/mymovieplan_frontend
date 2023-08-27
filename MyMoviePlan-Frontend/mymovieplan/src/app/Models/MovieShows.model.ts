import { Booking } from "./Booking.model";
import { Price } from "./Price.model";

export interface MovieShows {
    movieshowsid?: number;
    start?: Date;
    end?: Date;   // Add this field in backend
    movieid?: number;              // Need movie, add this in backed
    bookings?: Booking[];
    price?: Price;
}