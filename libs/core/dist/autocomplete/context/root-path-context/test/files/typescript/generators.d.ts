declare function getAddress(person: Person): Address;
declare function logPerson(person: Person): Generator<never, void, unknown>;
declare function getHardcodedAddress(): Address;
declare function getAddresses(people: Person[]): Address[];
declare function logPersonOrAddress(person: Person | Address): Person | Address;
declare function logPersonAndAddress(person: Person, address: Address): Generator<never, void, unknown>;
//# sourceMappingURL=generators.d.ts.map