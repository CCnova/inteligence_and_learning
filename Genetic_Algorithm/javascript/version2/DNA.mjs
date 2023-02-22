import { randomChar } from "./utils.mjs";

export default function makeDNA(size) {
  let genes = Array.from(Array(size), () => randomChar());
  let fitness = 0;

  return {
    genes,
    fitness,

    calculateFitness(target) {
      let score = 0;
      for (let i = 0; i < this.genes.length; i++) {
        if (this.genes[i] == target[i]) score++;
      }
      this.fitness = score / target.length;
      this.fitness = Math.pow(this.fitness, 4);
    },

    crossOver(partner) {
      const dividePoint = Math.floor(this.genes.length / 2);
      const child = makeDNA(size);
      for (let i = 0; i < genes.length; i++) {
        if (i < dividePoint) child.genes[i] = this.genes[i];
        else child.genes[i] = partner.genes[i];
      }
      return child;
    },

    sufferMutation(rate) {
      for (let i = 0; i < this.genes.length; i++) {
        if (Math.random() < rate) this.genes[i] = randomChar();
      }
    },
  };
}
