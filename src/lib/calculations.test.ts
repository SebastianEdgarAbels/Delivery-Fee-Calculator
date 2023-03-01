import {
  getCartValueSurcharge,
  getDistanceSurcharge,
  getItemSurcharge,
} from './calculations';

test('diff between 10 and the cartValue if the cartValue is less then 10', () => {
  expect(getCartValueSurcharge(8.9)).toBe(1.1);
});

describe('calculating the surcharge based on distance', () => {
  it('should return 2 if the distance is under 1000 or === to 1000', () => {
    expect(getDistanceSurcharge(1000)).toBe(2);
  });
  it('should return 3 if the distance is > 1000 && <= 1500', () => {
    expect(getDistanceSurcharge(1499)).toBe(3);
  });
  it('should return 4 if the distance is > 1000 && <= 1500', () => {
    expect(getDistanceSurcharge(1500)).toBe(3);
  });
  it('should return 2 if the distance is > 1500 && <= 2000', () => {
    expect(getDistanceSurcharge(1501)).toBe(4);
  });
});

describe('calculating surcharge based of number of items if items are more then 4', () => {
  it('should return 0 if the number of items is 4', () => {
    expect(getItemSurcharge(4)).toBe(0);
  });
  it('should return 0.5 if the number of items is 5', () => {
    expect(getItemSurcharge(5)).toBe(0.5);
  });
  it('should return 3 if the number of items is 10', () => {
    expect(getItemSurcharge(10)).toBe(3);
  });
  it('should return 5.70 if the number of items is 13 because an extra bulk is applyed when items are more then 12', () => {
    expect(getItemSurcharge(13)).toBe(5.7);
  });
});
