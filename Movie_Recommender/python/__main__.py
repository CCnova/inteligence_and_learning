import math
import json
import inquirer

users_file = open('./users.json', encoding="utf-8")
users_ratings = json.load(users_file).get('users')
users = {r.get('name'): r for r in users_ratings}


def key_is_movie_name(key: str) -> bool:
    """ Checks if key is a movie name """
    return key in ['IV', 'V', 'VI', 'I', 'II', 'III', 'VII', 'Rogue1', 'Holiday']


movies_titles = list(filter(key_is_movie_name, list(users_ratings[0].keys())))


def calculate_euclidean_similarity(new_ratings: dict, existent_user_name: str) -> float:
    """ Caclulate euclidean similarity for new_ratings and a existent user """
    existent_user_ratings = users.get(existent_user_name)
    distance_sum: int = 0
    for title in movies_titles:
        if new_ratings.get(title) and existent_user_ratings.get(title):
            distance_sum += pow(int(new_ratings.get(title)) -
                                existent_user_ratings.get(title), 2)

    distance_sum_srqt = math.sqrt(distance_sum)

    return {**existent_user_ratings, 'similarity': 1/(1 + distance_sum_srqt)}


def find_k_nearest_neighboors(ratings: dict, k: int) -> list:
    """ Find the k_nearest neighboors based on euclidean similarity """
    similarities = [calculate_euclidean_similarity(
        ratings, user) for user in users]

    return sorted(similarities, key=lambda s: s['similarity'], reverse=True)[:k]


def calculate_weighted_average(dict_list: list, average_key: str, weight_key: str) -> float:
    """ Calculate weighted average following a average_key and weight_key """
    average = 0
    weight_sum = 0
    for dict_entry in dict_list:
        if dict_entry.get(average_key) and dict_entry.get(weight_key):
            weight_sum += dict_entry.get(weight_key)
            average += dict_entry.get(weight_key)*dict_entry.get(average_key)

    return average/weight_sum


def predict_not_seen_ratings(ratings: dict):
    """ Make the actual prediction using k_nearest neighboors """
    k_nearest_neighboors = find_k_nearest_neighboors(ratings, 5)
    not_seen_movies = list(
        filter(lambda m: ratings.get(m) == '', ratings.keys()))

    ratings_prediction = {movie: 0 for movie in not_seen_movies}
    for not_seen_movie in not_seen_movies:
        ratings_prediction[not_seen_movie] += calculate_weighted_average(
            k_nearest_neighboors, not_seen_movie, 'similarity')

    print(ratings_prediction)


command_line_questions = [inquirer.Text(
    name=movie_name, message=movie_name) for movie_name in movies_titles]

print('Enter the rating for each Star wars movie or leave blank if you did not watch it')
ratings = inquirer.prompt(command_line_questions)

predict_not_seen_ratings(ratings)
