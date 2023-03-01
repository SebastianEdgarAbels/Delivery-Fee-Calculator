export const getCartValueSurcharge = (cartVal: number) =>
  cartVal < 10 ? Number((10 - cartVal).toFixed(2)) : 0;
export const getDistanceSurcharge = (distance: number) => {
  let distanceSurcharge = 0;
  if (distance <= 1000) {
    distanceSurcharge = 2;
  } else {
    let kilometers = Math.floor(distance / 1000);
    let meters = distance % 1000;

    if (meters === 0) {
      distanceSurcharge = kilometers * 2;
    } else if (meters <= 500) {
      distanceSurcharge = kilometers * 2 + 1;
    } else {
      distanceSurcharge = kilometers * 2 + 2;
    }
  }
  return distanceSurcharge;
};
export const getItemSurcharge = (items: number) => {
  let itemSurcharge = 0;
  if (items > 4 && items < 13) {
    itemSurcharge = (items - 4) * 0.5;
  }

  if (items > 12) {
    itemSurcharge = (items - 4) * 0.5 + 1.2;
  }
  return itemSurcharge;
};
const fridayRushInterval = [
  '15 - 15.45',
  '15.15 - 16',
  '16 - 16.45',
  '16.15 - 17',
  '17 - 17.45',
  '17.15 - 18',
  '18 - 18.45',
  '18.15 - 19',
];

type getDeliveryFeeValueType = {
  cartVal: number;
  items: number;
  distance: number;
  date: number;
  selection: string;
};

export const getDeliveryFeeValue = ({
  cartVal,
  items,
  distance,
  date,
  selection,
}: getDeliveryFeeValueType): number => {
  if (cartVal >= 100) {
    return 0;
  }
  const cartValueSurcharge = getCartValueSurcharge(cartVal);
  const distanceSurcharge = getDistanceSurcharge(distance);
  const itemSurcharge = getItemSurcharge(items);

  const cartValueDistanceItemSurcharges = () => {
    const total = cartValueSurcharge + distanceSurcharge + itemSurcharge;
    if (total > 15) {
      return 15;
    }
    return total;
  };

  const isFriday = date === 5;
  const isFridayRush = isFriday && fridayRushInterval.includes(selection);
  const fridayRushSurcharge = () => {
    const total = cartValueDistanceItemSurcharges() * 1.2;
    if (total > 15) {
      return 15;
    }
    return total;
  };

  const weekDaysTotal = cartValueDistanceItemSurcharges();
  const fridayRushTotal = Number(fridayRushSurcharge().toFixed(2));
  if (isFridayRush) {
    return fridayRushTotal;
  }
  return weekDaysTotal;
};
