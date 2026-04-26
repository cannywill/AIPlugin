declare class Group {
    getPersonAddress(person: Person): Address;
    getHardcodedAddress(): Address;
    addPerson(person: Person): void;
    addPeople(people: Person[]): void;
    getAddresses(people: Person[]): Address[];
    logPersonWithAddress(person: Person<Address>): Person<Address>;
    logPersonOrAddress(person: Person | Address): Person | Address;
    logPersonAndAddress(person: Person, address: Address): void;
}
//# sourceMappingURL=classMethods.d.ts.map