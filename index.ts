// @ts-check

// Define a union type for the status
type Status = "started" | "stopped";

// Define the Vehicle class with appropriate types
class Vehicle {
  status: Status = "stopped";
  make: string;
  model: string;
  wheels: number | string;

  constructor(make: string, model: string, wheels: number | string) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }

  start(): void {
    this.status = "started";
  }

  stop(): void {
    this.status = "stopped";
  }
}

// Define the Car class
class Car extends Vehicle {
  constructor(make: string, model: string) {
    super(make, model, "four");
  }
}

// Define the MotorCycle class
class MotorCycle extends Vehicle {
  constructor(make: string, model: string) {
    super(make, model, 2);
  }
}

// Define the printStatus function
function printStatus(vehicle: Vehicle): void {
  if (vehicle.status === "started") {
    console.log("The vehicle is running.");
  } else {
    console.log("The vehicle is stopped.");
  }
}

// Test the Vehicle, Car, and MotorCycle classes
const myHarley = new MotorCycle("Harley-Davidson", "Low Rider S");
myHarley.start();
printStatus(myHarley);
console.log(myHarley.make.toUpperCase());

const myBuick = new Car("Buick", "Regal");
myBuick.wheels = (parseInt(myBuick.wheels as string) - 1).toString();
console.log(myBuick.wheels);
console.log(myBuick.model); // Fixed typo from "mdl" to "model"

// Define the generic NCycle class
class NCycle<T> {
  status: Status = "stopped";
  make: T | T[];
  model: T | T[];
  year: number;

  constructor(
    make: T | T[],
    model: T | T[],
    year: number,
    status: Status = "stopped"
  ) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.status = status;
  }

  start(): void {
    this.status = "started";
  }

  stop(): void {
    this.status = "stopped";
  }

  print(index: number = 0): void {
    if (
      Array.isArray(this.make) &&
      Array.isArray(this.model) &&
      this.make[index] &&
      this.model[index]
    ) {
      console.log(
        `This NCycle has a ${this.make[index]} ${this.model[index]} at ${index}.`
      );
    } else if (!Array.isArray(this.make) && !Array.isArray(this.model)) {
      console.log(`This is a ${this.make} ${this.model} NCycle.`);
    } else {
      console.log("This NCycle was not created properly.");
    }
  }

  printAll(): void {
    if (Array.isArray(this.make) && Array.isArray(this.model)) {
      for (let i = 0; i < Math.min(this.make.length, this.model.length); i++) {
        this.print(i);
      }
    } else {
      this.print();
    }
  }
}

// Test the NCycle class
const myNCycle1 = new NCycle("Yamaha", "MT-09", 2021);
myNCycle1.print(); // This is a Yamaha MT-09 NCycle.
myNCycle1.printAll(); // This is a Yamaha MT-09 NCycle.

const myNCycle2 = new NCycle(["Yamaha", "Honda"], ["MT-09", "CBR500R"], 2021);
myNCycle2.print(1); // This NCycle has a Honda CBR500R at 1.
myNCycle2.printAll();
// This NCycle has a Yamaha MT-09 at 0.
// This NCycle has a Honda CBR500R at 1.

const myNCycle3 = new NCycle(["Yamaha"], "MT-09", 2021);
myNCycle3.print(); // This NCycle was not created properly.
myNCycle3.printAll(); // This NCycle was not created properly.
