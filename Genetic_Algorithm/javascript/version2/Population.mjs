import makeDNA from "./DNA.mjs";

export default function makePopulation(target, size, mutationRate) {
  let individuals = Array.from(Array(size), () => makeDNA(target.length));
  let selectionProbabilityPool = Array.from(individuals);

  return {
    individuals,
    selectionProbabilityPool,
    calculateFitness() {
      console.log("CALCULATING FITNESS FOR: ", this.individuals);
      for (let individual of this.individuals) {
        individual.calculateFitness(target);
      }
      console.log("DONE");
      console.log("POPULATION WITH FITNESS: ", this.individuals);
    },

    buildProbabilityPool() {
      console.log("Building probability pool...");
      this.selectionProbabilityPool = [];

      for (let individual of this.individuals) {
        this.selectionProbabilityPool = this.selectionProbabilityPool.concat(
          Array.from(Array(individual.fitness * 10), () => individual)
        );
      }
      console.log("DONE");
      console.log("Selection pool: ", this.selectionProbabilityPool);
    },

    performReproduction() {
      console.log("PERFORMING REPRODUCTION...");
      for (let i = 0; i < individuals.length; i++) {
        const parentAIndex = Math.random() * selectionProbabilityPool.length;
        const parentBIndex = Math.random() * selectionProbabilityPool.length;
        const parentA = selectionProbabilityPool[parentAIndex];
        const parentB = selectionProbabilityPool[parentBIndex];

        let child;
        if (parentA && parentB) {
          child = parentA.crossOver(parentB);
          child.sufferMutation(mutationRate);
          this.individuals[i] = child;
        } else {
          continue;
        }
      }
      console.log("DONE");
      console.log("NEW POPULATION: ", this.individuals);
    },

    isTargetBorn() {
      for (let individual of this.individuals) {
        if (individual.genes.join("") === target) return true;
      }

      return false;
    },
  };
}
