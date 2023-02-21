import { Population } from "./Population.mjs";

const TARGET = "unicorn";
const MUTATION_RATE = 0.01;
const POPULATION_MAX = 10;
const population = new Population(TARGET, MUTATION_RATE, POPULATION_MAX);

while (true) {
  population.calculateFitness();
  population.naturalSelection(); // Build selection probability pool
  population.generate(); // Select elements from pool
  // population.evaluate();
  const isDone = population.haveTarget();

  if (isDone) {
    console.log("GENERATED THE TARGET!");
    break;
  }
}
