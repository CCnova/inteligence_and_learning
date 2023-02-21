import makePopulation from "./Population.mjs";

const TARGET = "unicorn";
const MAX_POPULATION_SIZE = 10;
const MUTATION_RATE = 0.01;
const population = makePopulation(TARGET, MAX_POPULATION_SIZE, MUTATION_RATE);

while (true) {
  population.calculateFitness();
  population.buildProbabilityPool();
  population.performReproduction();
  const generatedTarget = population.isTargetBorn();

  if (generatedTarget) {
    console.log("Target is born");
    break;
  }
}
