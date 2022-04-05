import pickle
import numpy as np
import os
from .trainmodel import knn 

def load(path):
    return pickle.load(open(path, "rb"))

def recommend(R_train, R_predicted, items_ids, output_path):

    train_path = output_path + '/train_ratings.txt'
    with open(train_path, encoding='latin-1') as f:
        r, c = R_train.nonzero()

        for row, col in zip(r, c):
            f.write('%d::%s::%.1f\n' % (row, items_ids[col], R_train[row, col]))

            R_predicted[row, col] = 0

    recomm_path = output_path + '/recommend_ratings.txt'
    with open(recomm_path, encoding='latin-1') as f:
        for i in range(R_predicted.shape[0]):
            for j in range(R_predicted.shape[1]):
                if R_predicted[i, j] >= 1:
                    f.write('%d::%s::%.3f\n' % (i, item_ids[j], R_predicted[i, j]))

if __name__ == '__main__':

    input_path = ''

    R_train = load(input_path + '/R_train.pkl')
    R_valid = load(input_path + '/R_valid.pkl')
    item_ids = load(input_path + '/item_ids.pkl')

    alg = 0
    if alg == 0:
        # KNN
        k = 5
        R_predicted = knn.predict(R_train, k)
        recommend(R_train, R_predicted, item_ids, '.')
    elif alg == 1 or alg == 2:
        pass

        # d = args.dim
        # lambda_u = args.lambda_u
        # lambda_v = args.lambda_v
        # max_iter = args.max_iter

        # theta = None
        # if alg == 2:
        #     # PLSI
        #     print("\n\t start training PLSI")
        #     theta = plsi.train(input_path, d, False)
        #     pass
        # Matrix Factorization
    #     print()
    #     print("\n\t start training MF")
    #     R_predicted = matrix_factorization.train(res_dir=output_path, R_train=R_train, R_valid=R_valid,
    #                                max_iter=max_iter, lambda_u=lambda_u, lambda_v=lambda_v, dimension=d, theta=theta)
    #     recommend(R_train, R_predicted, item_ids, '.')
    # else:
    #     print("select algorithm from 0 to 2")
