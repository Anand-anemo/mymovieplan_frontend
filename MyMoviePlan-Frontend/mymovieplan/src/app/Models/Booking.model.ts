import { BookingDetails } from "./BookingDetails.model";
import { Payment } from "./Payment.model";

export interface Booking {
    id?: number;
    amount?: number;
    totalSeats?: number;
    bookedOn?: Date;
    dateOfBooking?: Date;
    seatNumbers?: string[];
    userId?: string;                 // Need user, add this in backed
    payment?: Payment;
    bookingDetails: BookingDetails;
}