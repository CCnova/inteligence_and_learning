# Darwinian Natural Selection

- _Heredity_: There must be a process in place by which children receive the properties of their parents.

- _Variation_: There must be a variety of traits present in the population or a means with which to introduce variation.

- _Selection_: There must be a mechanism by which some members of a population have the opportunity to be parents and pass down their genetic information and some do not. This is typically referred to as `"Survival of the fittest"`

# Example

- Generating the word `unicorn`:

1. Create a random population of n elements [`Variation`]<br/>
   . n = 4 -> ['unijorm', 'pancake', 'aaaaaah', 'popcorn']

2. Calculate the fittest for each element using a function f [`Selection`] <br />
   . f(x) -> number of letters existent on the target word <br />
   . f('unijorm') -> 5 <br>
   . f('pancake') -> 1 <br>
   . f('aaaaaah') -> 0 <br>
   . f('popcorn') -> 4 <br>

3. Selection <br>
   . Pick `2` (this can be changed) parents by randomly choosing them base on the output of the fittest function, the bigger the output, the more likely the parent is to be choosen. <br>

4. Make a new element from the choosen parents [`Heredity`] <br>
   . Crossover -> Pick a portion of material from each parent and generate a new value from it <br>
   . Mutation -> A applied chance that a value of the heredity material is random changed in the process <br>

5. Replace the old population with the new population and return to step 2
