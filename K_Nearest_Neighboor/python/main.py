import json
import math

users_file = open('./users.json', "r", encoding='utf-8')
users_ratings = json.load(users_file).get('users')
users = {rating.get('name'): rating for rating in users_ratings}


def key_is_movie_name(key):
    return key in ['IV', 'V', 'VI', 'I', 'II', "III", "VII", "Rogue1", "Holiday"]


def calculate_euclidean_similarity(person1_name, person2_name):
    if person1_name == person2_name:
        return {'user 1': person1_name, 'user 2': person2_name, 'similarity': -1}
    person1 = dict(users.get(person1_name))
    person2 = dict(users.get(person2_name))
    movie_titles = list(filter(key_is_movie_name, person1.keys()))

    distance_sum = 0
    for title in movie_titles:
        if person1.get(title) and person2.get(title):
            distance_sum += pow(person1.get(title) - person2.get(title), 2)

    distance_sum_srqt = math.sqrt(distance_sum)

    return {'user 1': person1_name, 'user 2': person2_name, 'similarity': 1/(1 + distance_sum_srqt)}


def find_k_nearest_neighboors(person_name, k):
    similarities = [calculate_euclidean_similarity(
        person_name, user) for user in users]

    return sorted(similarities, key=lambda s: s['similarity'], reverse=True)[:k]


print(find_k_nearest_neighboors('Alca', 5))
print('If you want to see for other users, change the name on the code')
