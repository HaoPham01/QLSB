export interface Booking{
    bookingId: number,
    userId: number;
    fieldId: number;
    priceBooking: string;
    startTime: Date;
    endTime: Date;
    status: number;
    createDate: Date;
    updateDate: Date;
}