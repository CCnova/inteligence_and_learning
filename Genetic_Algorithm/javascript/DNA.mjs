function newChar() {
  const MAX = 120;
  const MIN = 63;
  let c = Math.floor(Math.random() * (MAX - MIN) + MIN);
  if (c === 63) c = 32;
  if (c === 64) c = 46;

  return String.fromCharCode(c);
}

export function DNA(size) {
  this.genes = Array.from(Array(size), (_) => newChar());
  this.fitness = 0;

  this.calculateFitness = function (target) {
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] === target[i]) {
        score++;
      }
    }
    this.fitness = score / target.length; // get the percentage
  };

  /**
   * This can follow different algorithms to do the crossover.
   * Currently it's following a random midpoint gathering.
   *
   * @param {DNA} partner
   */
  this.crossover = function (partner) {
    const child = new DNA(this.genes.length);
    const midpoint = Math.floor(Math.random(this.genes.length));

    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }

    return child;
  };

  this.mutate = function (mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (Math.random() < mutationRate) {
        this.genes[i] = newChar();
      }
    }
  };
}
