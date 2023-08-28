interface Invoice {
  openSeatsCharge: number;
  cabinSeatsCharge: number;
  conferenceRoomCharge: number;
  mealsCharge: number;
  totalCharge: number;
  totalGSTCharge: number;
}

function InvoiceCalculation(services: any): Invoice {
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

  let openSeatsCharge = services.openSeats * 5000;
  let cabinSeatsCharge = services.cabinSeats * 10000;

  const openSeatsFreeHours = services.openSeats * 5;
  const cabinSeatsFreeHours = services.cabinSeats * 10;
  const totalFreeHours = openSeatsFreeHours + cabinSeatsFreeHours;
  let conferenceRoomCharge = Math.max(services.conferenceRoomHours - totalFreeHours, 0) * 200;

  let mealsCharge = services.totalMeals * 100;

  const conferenceRoomGST = (conferenceRoomCharge * 18) / 100;
  const seatsGST = ((openSeatsCharge + cabinSeatsCharge) * 18) / 100;
  const mealsGST = (mealsCharge * 12) / 100;
  const totalCharge = (openSeatsCharge + cabinSeatsCharge + seatsGST) + (conferenceRoomCharge + conferenceRoomGST) + (mealsCharge + mealsGST);

  openSeatsCharge = openSeatsCharge + (openSeatsCharge * 18) / 100;
  cabinSeatsCharge = cabinSeatsCharge + (cabinSeatsCharge * 18) / 100;
  conferenceRoomCharge = conferenceRoomCharge + conferenceRoomGST;
  mealsCharge = mealsCharge + mealsGST;

  const totalGSTCharge = conferenceRoomGST + seatsGST + mealsGST;

  return {
    openSeatsCharge,
    cabinSeatsCharge,
    conferenceRoomCharge,
    mealsCharge,
    totalCharge,
    totalGSTCharge,
  };
}

export { InvoiceCalculation };