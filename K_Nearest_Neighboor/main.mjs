import inquirer from "inquirer";
import movies from "./movies.json" assert { type: "json" };

let usersByName = {};

const choices = movies.users.map((user) => {
  usersByName[user.name] = user;
  return user.name;
});

inquirer
  .prompt([
    {
      type: "list",
      name: "personName",
      message:
        "Choose a person to get the 5 persons with most similar taste for Star Wars movies",
      choices,
    },
  ])
  .then(findNearesNeighboors)
  .then(console.log);

function findNearesNeighboors({ personName }) {
  const similarities = movies.users.map((user) => {
    let similarity;
    if (user.name === personName) similarity = -1;
    else
      similarity = calculateEuclideanSimilarity({
        person1Name: personName,
        person2Name: user.name,
      });
    return { name: user.name, similarity };
  });

  return similarities.sort((a, b) => b.similarity - a.similarity).slice(0, 5);
}

function calculateEuclideanSimilarity({ person1Name, person2Name }) {
  const person1 = usersByName[person1Name];
  const person2 = usersByName[person2Name];

  const movieTitles = Object.keys(person1).filter(
    (key) => key !== "timestamp" && key !== "name"
  );

  const differencesSum = movieTitles.reduce((acc, curr, index) => {
    const diff = person1[movieTitles[index]] - person2[movieTitles[index]];
    return acc + Math.pow(diff, 2);
  }, 0);

  const differencesSquareRoot = Math.sqrt(differencesSum);
  console.log("differencesSquareRoot: ", differencesSquareRoot);

  const similarity = 1 / (1 + differencesSquareRoot); // The bigger the difference, smaller is the similarity
  console.log("Similarity: ", similarity);

  return similarity;
}
