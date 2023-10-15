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

export interface staffBooking{
    bookingId: number,
    userId: number,
    fieldId: number,
    priceBooking: number,
    startTime: Date,
    endTime: Date,
    status: number,
    createDate: Date,
    updateDate: Date,
    fullName: string,
    phone: string,
    fieldName: string,
    statusInvoice: number
}