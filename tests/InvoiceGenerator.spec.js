"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InvoiceGenerator_1 = require("../src/InvoiceGenerator");
describe("INVOICE GENERATOR", function () {
    it("Should calculate the Invoice amount correctly", function () {
        var consumedServices = {
            openSeats: 2,
            cabinSeats: 3,
            conferenceRoomHours: 35,
            totalMeals: 5,
        };
        var invoiceGen = (0, InvoiceGenerator_1.InvoiceCalculation)(consumedServices);
        expect(invoiceGen.openSeatsCharge).toBe(11800);
        expect(invoiceGen.cabinSeatsCharge).toBe(35400);
        expect(invoiceGen.conferenceRoomCharge).toBe(0);
        expect(invoiceGen.mealsCharge).toBe(560);
        expect(invoiceGen.totalCharge).toBe(47760);
        expect(invoiceGen.totalGSTCharge).toBe(7260);
    });
    it('Should handles invalid inputs', function () {
        var invalidConsumedServices = {
            openSeats: -10,
            cabinSeats: 3,
            conferenceRoomHours: -20,
            totalMeals: 10,
        };
        var invoiceGen = (0, InvoiceGenerator_1.InvoiceCalculation)(invalidConsumedServices);
        expect(invoiceGen.openSeatsCharge).toBe(0);
        expect(invoiceGen.cabinSeatsCharge).toBe(0);
        expect(invoiceGen.conferenceRoomCharge).toBe(0);
        expect(invoiceGen.mealsCharge).toBe(0);
        expect(invoiceGen.totalCharge).toBe(0);
        expect(invoiceGen.totalGSTCharge).toBe(0);
    });
    it('Should calculate charges for seats and meals only', function () {
        var consumedServices = {
            openSeats: 2,
            cabinSeats: 0,
            conferenceRoomHours: 0,
            totalMeals: 30,
        };
        var invoiceGen = (0, InvoiceGenerator_1.InvoiceCalculation)(consumedServices);
        expect(invoiceGen.openSeatsCharge).toBe(11800);
        expect(invoiceGen.cabinSeatsCharge).toBe(0);
        expect(invoiceGen.conferenceRoomCharge).toBe(0);
        expect(invoiceGen.mealsCharge).toBe(3360);
        expect(invoiceGen.totalCharge).toBe(15160);
        expect(invoiceGen.totalGSTCharge).toBe(2160);
    });
    it('Should calculate charges for More conference room hours than allowed free hours', function () {
        var consumedServices = {
            openSeats: 0,
            cabinSeats: 1,
            conferenceRoomHours: 50,
            totalMeals: 10,
        };
        var invoiceGen = (0, InvoiceGenerator_1.InvoiceCalculation)(consumedServices);
        expect(invoiceGen.openSeatsCharge).toBe(0);
        expect(invoiceGen.cabinSeatsCharge).toBe(11800);
        expect(invoiceGen.conferenceRoomCharge).toBe(9440);
        expect(invoiceGen.mealsCharge).toBe(1120);
        expect(invoiceGen.totalCharge).toBe(22360);
        expect(invoiceGen.totalGSTCharge).toBe(3360);
    });
});
