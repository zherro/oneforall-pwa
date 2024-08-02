interface TimeSlot {
  open: string;
  close: string;
}

export default interface BusinessHours {
  [day: string]: TimeSlot[];
}

export const getBusinessStatus = (businessHours: BusinessHours): string => {
  try {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const now = new Date();
    const currentDay = days[now.getDay()];
    const currentTime =
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0");

    const slots = businessHours[currentDay];
    if (!slots || slots.length === 0) {
      return "Closed";
    }

    for (const slot of slots) {
      const [openHour, openMinute] = slot.open.split(":").map(Number);
      const [closeHour, closeMinute] = slot.close.split(":").map(Number);

      const openingTime = new Date(now);
      openingTime.setHours(openHour, openMinute, 0, 0);

      const closingTime = new Date(now);
      closingTime.setHours(closeHour, closeMinute, 0, 0);

      const diffToOpen = (openingTime.getTime() - now.getTime()) / (1000 * 60); // difference in minutes to open
      const diffToClose = (closingTime.getTime() - now.getTime()) / (1000 * 60); // difference in minutes to close

      if (currentTime >= slot.open && currentTime < slot.close) {
        if (diffToClose <= 30) {
          return "Closing soon";
        }
        return "Open";
      } else if (diffToOpen <= 30 && diffToOpen > 0) {
        return "Opening soon";
      }
    }
  } catch (ignored: any) {}

  return "Closed";
};
