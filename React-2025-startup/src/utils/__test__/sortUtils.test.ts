import { sortByNumber } from '../sortUtils';

type Person = {
  name: string;
  age: number;
};

const PERSONS: Array<Person> = [
  { name: 'kiet Ve tran', age: 20 },
  { name: 'Ole tran', age: 10 },
  { name: 'Petter tran', age: 17 },
  { name: 'Kim tran', age: 23 },
];
describe('sortUtils', () => {
  it('sortByNumber', () => {
    const sortedAges = PERSONS.sort((aPerson, bPerson) => {
      return sortByNumber<Person>(aPerson, bPerson, 'age');
    }).map(({ age }) => age);

    expect(sortedAges).toEqual([10, 17, 20, 23]);
  });
});
