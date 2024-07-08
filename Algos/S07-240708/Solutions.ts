function multiplyAll(list: number[]) {
  return function (multi: number) {
    return list.map((num) => num * multi);
  };
}

// ---

export function movie(card: number, ticket: number, perc: number): number {
  let aCost = 0;
  let bCost = card;
  let bLastTicket = ticket;
  let turn = 0;

  do {
    aCost += ticket;
    bLastTicket *= perc;
    bCost += bLastTicket;
    turn++;

    //console.log(`Turn #${turn}: ${aCost} vs ${bCost}`);
  } while (Math.ceil(bCost) >= aCost);

  return turn;
}

// ---

export const factorial = (n: number): number => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};
