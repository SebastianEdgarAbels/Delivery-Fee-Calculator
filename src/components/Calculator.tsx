import { useState, FormEvent } from 'react';
import './Calculator.css';
import { getDeliveryFeeValue } from '../lib/calculations';

const Calculator = () => {
  const [cartVal, setCartVal] = useState(0);
  const [items, setItems] = useState(0);
  const [distance, setDistance] = useState(0);
  const [date, setDate] = useState(0);
  const [selection, setSelection] = useState('8 - 8.45');
  const [totalDeliveryFee, setTotalDeliveryFee] = useState(0);

  const timeIntervals = [
    '8 - 8.45',
    '8.15 - 9',
    '9 - 9.45',
    '10 - 10.45',
    '10.15 - 11',
    '11 - 11.45',
    '11.15 - 12',
    '12 - 12.25',
    '12.15 - 13',
    '13 - 13.45',
    '13.15 - 14',
    '14 - 14.45',
    '14.15 - 15',
    '15 - 15.45',
    '15.15 - 16',
    '16 - 16.45',
    '16.15 - 17',
    '17.15 - 18',
    '18 - 18.45',
    '18.15 - 19',
    '19 - 19.45',
    '19.15 - 20',
    '20 - 20.45',
    '20.15 - 21',
    '21 - 21.45',
    '21.15 - 22',
    ' 22 - 22.45',
    ' 22.15 - 23',
    '23 - 23.45',
  ];

  const handleDateSelection = (e: FormEvent<HTMLInputElement>): void => {
    setDate(new Date(e.currentTarget.value).getDay());
    // 0 is sunday | 1 is monday | 2 is tuesday | 3 is wednesday | 4 is thursday | 5 is friday | 6 is saturday
  };

  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setTotalDeliveryFee(
      getDeliveryFeeValue({ cartVal, items, distance, date, selection })
    );
  };

  return (
    <>
      <form onSubmit={submit}>
        <label htmlFor="totalCartVal">Cart Value</label>
        <br />
        <input
          type="number"
          step="0.001"
          name="totalCartVal"
          onChange={(e) => setCartVal(Number(e.currentTarget.value))}
          required
        />
        <br />
        <br />
        <label htmlFor="distance">Distance in meter</label>
        <br />
        <input
          type="number"
          name="distance"
          onChange={(e) => setDistance(Number(e.currentTarget.value))}
          required
        />
        <br />
        <br />
        <label htmlFor="items">Number of Items</label>
        <br />
        <input
          type="number"
          name="items"
          onChange={(e) => setItems(Number(e.currentTarget.value))}
          required
        />
        <br />
        <br />
        <label htmlFor="date">Deliverivy day</label>
        <br />
        <input
          type="date"
          name="date"
          onChange={handleDateSelection}
          required
        />
        <br />
        <br />
        <label htmlFor="time">Between which hour interval?</label>
        <br />
        <select
          name="interval"
          id="interval"
          onChange={(e) => setSelection(e.currentTarget.value)}
        >
          {timeIntervals.map((interval, i) => {
            return (
              <option key={i} value={interval}>
                {interval}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <button>Submit</button>
        {!!totalDeliveryFee && (
          <p>The total delivery Fee is: {totalDeliveryFee} €</p>
        )}
      </form>
    </>
  );
};

export default Calculator;
