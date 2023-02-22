import inquirer from "inquirer";
import usersRatings from "./movies.json" assert { type: "json" };

const notMovieTitlesKeys = ["timestamp", "name"];
const moviesTitles = Object.keys(usersRatings.users[0]).filter(
  (key) => !notMovieTitlesKeys.includes(key)
);

inquirer
  .prompt(
    moviesTitles.map((title) => ({
      name: title,
      message: `Your rating for ${title}?`,
      default: "not seen",
    }))
  )
  .then(cleanInputData)
  .then(predictRating)
  .then(logResult);

function logResult(ratings) {
  console.log("Here is the prediction of not seen movies rating");
  console.log(ratings);
}

function cleanInputData(ratings) {
  return Object.keys(ratings).reduce((acc, movie) => {
    let entryValue;
    if (ratings[movie] === "not seen") entryValue = null;
    else entryValue = Number(ratings[movie]);

    return { ...acc, [movie]: entryValue };
  }, {});
}

function predictRating(ratings) {
  const notSeenMovies = Object.keys(ratings).filter(
    (movie) => ratings[movie] == null
  );
  const kNearestNeighboors = findKNearestNeighboors(ratings, 5);
  console.log("Users with similar taste: ", kNearestNeighboors);

  return notSeenMovies.reduce(
    (predictions, movie) => ({
      ...predictions,
      [movie]: calculateWeightedAverageFor(kNearestNeighboors, movie),
    }),
    {}
  );
}

function calculateWeightedAverageFor(neighboors, key) {
  const sumOfWeights = neighboors.reduce(
    (weightSum, neighboor) => weightSum + neighboor.similarity,
    0
  );

  return (
    neighboors.reduce(
      (average, neighboor) =>
        average + (neighboor[key] ?? 0) * neighboor.similarity,
      0
    ) / sumOfWeights
  );
}

function findKNearestNeighboors(ratings, numberOfNeighboors) {
  const similarities = usersRatings.users.map((user) => {
    const similarity = calculateEuclideanSimilarity(ratings, user);
    return { ...user, similarity };
  });

  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, numberOfNeighboors);
}

function calculateEuclideanSimilarity(person1Ratings, person2Ratings) {
  const differencesSum = moviesTitles.reduce((acc, _curr, index) => {
    const person1Rate = person1Ratings[moviesTitles[index]];
    const person2Rate = person2Ratings[moviesTitles[index]];
    if (person1Rate && person2Rate) {
      const diff = person1Rate - person2Rate;
      return acc + Math.pow(diff, 2);
    }
    return acc;
  }, 0);

  const differencesSquareRoot = Math.sqrt(differencesSum);

  return differencesSquareRoot == 0
    ? differencesSquareRoot
    : 1 / (1 + differencesSquareRoot); // The bigger the difference, smaller is the similarity
}
