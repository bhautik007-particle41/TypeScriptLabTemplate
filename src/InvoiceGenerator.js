"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceCalculation = void 0;
function InvoiceCalculation(services) {
    if (services.openSeats < 0 || services.cabinSeats < 0 || services.conferenceRoomHours < 0 || services.totalMeals < 0) {
        return {
            openSeatsCharge: 0,
            cabinSeatsCharge: 0,
            conferenceRoomCharge: 0,
            mealsCharge: 0,
            totalCharge: 0,
            totalGSTCharge: 0,
        };
    }
    var openSeatsCharge = services.openSeats * 5000;
    var cabinSeatsCharge = services.cabinSeats * 10000;
    var openSeatsFreeHours = services.openSeats * 5;
    var cabinSeatsFreeHours = services.cabinSeats * 10;
    var totalFreeHours = openSeatsFreeHours + cabinSeatsFreeHours;
    var conferenceRoomCharge = Math.max(services.conferenceRoomHours - totalFreeHours, 0) * 200;
    var mealsCharge = services.totalMeals * 100;
    var conferenceRoomGST = (conferenceRoomCharge * 18) / 100;
    var seatsGST = ((openSeatsCharge + cabinSeatsCharge) * 18) / 100;
    var mealsGST = (mealsCharge * 12) / 100;
    var totalCharge = (openSeatsCharge + cabinSeatsCharge + seatsGST) + (conferenceRoomCharge + conferenceRoomGST) + (mealsCharge + mealsGST);
    openSeatsCharge = openSeatsCharge + (openSeatsCharge * 18) / 100;
    cabinSeatsCharge = cabinSeatsCharge + (cabinSeatsCharge * 18) / 100;
    conferenceRoomCharge = conferenceRoomCharge + conferenceRoomGST;
    mealsCharge = mealsCharge + mealsGST;
    var totalGSTCharge = conferenceRoomGST + seatsGST + mealsGST;
    return {
        openSeatsCharge: openSeatsCharge,
        cabinSeatsCharge: cabinSeatsCharge,
        conferenceRoomCharge: conferenceRoomCharge,
        mealsCharge: mealsCharge,
        totalCharge: totalCharge,
        totalGSTCharge: totalGSTCharge,
    };
}
exports.InvoiceCalculation = InvoiceCalculation;
