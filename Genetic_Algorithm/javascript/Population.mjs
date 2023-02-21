import { DNA } from "./DNA.mjs";

export function Population(target, mutationRate, popMax) {
  this.population = Array.from(Array(popMax), (_) => new DNA(target.length)); // Current population
  this.target = target;
  this.mutationRate = mutationRate;
  this.selectionProbabilityPool = [];
  this.numberOfGenerations = 0;

  this.calculateFitness = function () {
    for (let individual of this.population) {
      individual.calculateFitness(this.target);
    }
  };

  this.naturalSelection = function () {
    this.selectionProbabilityPool = [];

    for (let i = 0; i < this.population.length; i++) {
      const individualFitness = this.population[i].fitness;
      console.log({ individualFitness });
      const numberOccurrenciesInPool = Math.floor(individualFitness * 100);
      for (let j = 0; j < numberOccurrenciesInPool; j++) {
        this.selectionProbabilityPool.push(this.population[i]);
      }
    }
  };

  this.generate = function () {
    console.log("Pool", this.selectionProbabilityPool);
    for (let i = 0; i < this.population.length; i++) {
      const partnerAIndex = Math.floor(
        Math.random() * this.selectionProbabilityPool.length
      );
      const partnerBIndex = Math.floor(
        Math.random() * this.selectionProbabilityPool.length
      );
      const partnerA = this.selectionProbabilityPool[partnerAIndex];
      console.log("Partner A ", partnerA.genes);
      console.log("index", partnerAIndex);
      const partnerB = this.selectionProbabilityPool[partnerBIndex];
      console.log("index", partnerBIndex);
      console.log("Partner B ", partnerB.genes);
      const child = partnerA.crossover(partnerB);
      console.log("Child before mutation", child.genes);
      child.mutate(this.mutationRate);
      console.log("Child after mutation", child.genes);
      this.population[i] = child;
    }
    this.numberOfGenerations++;
  };

  this.haveTarget = function () {
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i] === this.target) return true;
    }

    return false;
  };
}
