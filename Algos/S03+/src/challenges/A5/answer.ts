/**
 * In this challenge, you will get the opening slots of a company by day of
 * the week (1 being Monday, this is the iso week day). You have to create
 * a function that returns the planning of the opening hours of the company for
 * a precise day, hour by hour. If there is an ambiguity for a given hour
 * you should consider so company to be closed.
 *
 * We ensure that opening slots are valid (the opensAt time is before closesAt,
 * no need to check that).
 *
 * Tip: opening slots are not sorted chronologically!
 *
 * BONUS: too easy? You may do the very same exercice but returning a 30 minutes slots
 * planning instead of a 60 one.
 *
 * Example:
 * Input: {
 *  openingSlots: [{ "isoWeekday": 1, "opensAt": "09:00", "closesAt": "12:00" }, { "isoWeekday": 1, "opensAt": "14:00", "closesAt": "19:30" }],
 *  isoWeekday: 1
 * Output: [
 *     { fromTime: "00:00", toTime: "01:00", status: "closed"},
 *     { fromTime: "01:00", toTime: "02:00", status: "closed"},
 *     ...,
 *     { fromTime: "09:00", toTime: "10:00", status: "opened"},
 *     ...,
 *     { fromTime: "19:00", toTime: "20:00", status: "closed"},
 *     ...,
 *     { fromTime: "23:00", toTime: "00:00", status: "closed"},
 * ]
 *
 * @param openingSlots List of opening slots of the company
 * @param isoWeekday Number of the day in the week we want the planning for (1 being Monday)
 * @returns The planning with the status of each slot of the given day, a slot being 60 minutes
 */

// ↓ uncomment bellow lines and add your response!
// Tristan's solution, congrats !
export default function ({
  openingSlots,
  isoWeekday,
}: {
  openingSlots: OpeningSlot[];
  isoWeekday: number;
}): PlanningSlot[] {
  const dayOpeningSlots = openingSlots.filter(
    (slot) => slot.isoWeekday === isoWeekday
  );
  const fullDaySchedule: PlanningSlot[] = [];
  for (let hour = 0; hour < 24; hour++) {
    const fromTime = `${String(hour).padStart(2, "0")}:00`;
    const toTime = `${String((hour + 1) % 24).padStart(2, "0")}:00`;
    fullDaySchedule.push({
      fromTime,
      toTime,
      status: "closed",
    });
  }
  const response = fullDaySchedule.map((slot) => {
    dayOpeningSlots.forEach((openingSlot) => {
      if (
        openingSlot.opensAt <= slot.fromTime &&
        slot.fromTime < openingSlot.closesAt &&
        openingSlot.opensAt < slot.toTime &&
        slot.toTime <= openingSlot.closesAt
      ) {
        slot.status = "opened";
      }
    });
    return slot;
  });
  return response;
}

// export default function ({
//   openingSlots,
//   isoWeekday,
// }: {
//   openingSlots: OpeningSlot[];
//   isoWeekday: number;
// }): PlanningSlot[] {
//   // On sort toutes les infos des jours qiu ne nous interessent pas
//   const daySlots = openingSlots.filter(
//     (slot) => slot.isoWeekday === isoWeekday
//   );

//   // On initialise les 24 creneaux en "closed"
//   const planning: PlanningSlot[] = [];
//   for (let hour = 0; hour < 24; hour++) {
//     planning.push({
//       fromTime: `${hour.toString().padStart(2, "0")}:00`,
//       toTime: `${((hour + 1) % 24).toString().padStart(2, "0")}:00`,
//       status: "closed",
//     });
//   }

//   daySlots.forEach((slot) => {
//     const [slotOpensHour, slotOpensMinute] = slot.opensAt
//       .split(":")
//       .map(Number);
//     const [slotClosesHour, slotClosesMinute] = slot.closesAt
//       .split(":")
//       .map(Number);

//     for (let hour = slotOpensHour; hour <= slotClosesHour; hour++) {
//       // (Meh solution, pas trouvé mieux assez vite): On convertit tout en minutes pour simplifier l'algo
//       const startHour = hour * 60;
//       const endHour = startHour + 60;

//       const startTime = slotOpensHour * 60 + slotOpensMinute;
//       const endTime = slotClosesHour * 60 + slotClosesMinute;

//       if (
//         (startTime <= startHour && endTime >= endHour) ||
//         (startTime <= startHour && endTime > startHour && endTime <= endHour)
//       ) {
//         if (planning[hour].status === "opened") {
//           planning[hour].status = "closed";
//         } else {
//           const overlap =
//             Math.min(endHour, endTime) - Math.max(startHour, startTime);
//           if (overlap >= 60) {
//             planning[hour].status = "opened";
//           }
//         }
//       }
//     }
//   });

//   return planning;
// }

// used interfaces, do not touch
export interface OpeningSlot {
  isoWeekday: number;
  opensAt: string;
  closesAt: string;
}

export interface PlanningSlot {
  fromTime: string;
  toTime: string;
  status: "opened" | "closed";
}
