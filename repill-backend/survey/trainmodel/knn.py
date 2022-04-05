import pandas as pd
import numpy as np
from scipy.sparse import csr_matrix
from scipy.sparse.linalg import norm

# 유사도 가중치평균을 내어 제공
# Rationale: 너와 비슷한 사람은 이걸 좋아했네

#### compute_sim으로 유사도 계산 (inner, consine)
# 자기 자신은 이웃으로 취급하지 않음 (diagonal = 0)

#### predict로 예상 평점을 계산
# numpy.sort = 배열 내의 원소를 크기에 따라 정렬
# numpy.argsort: 실제 sort는 하지 않고 순서만 알 수 있음

# numpy.reshape(): 데이터를 유지한 채 차원과 형상을 바꿈
# (100,)을 (2, 50)으로, 또 (2, -1)처럼 자동으로 바꾸게 할 수 있음 (-1 ->> 50)
# 참고: broadcasting by .reshape()

# def compute_sim(R):
#     num_users = R.shape[0]
#     print(num_users, "numu")

#     # numpy.transpose(): 전치행렬
#     UbyU = (R * R.transpose()).toarray()
#     print(UbyU)
#     # UbyU = (R * R.T).toarray()

#     # 자기 자신의 유사도는 0
#     UbyU[range(num_users), range(num_users)] = 0
#     return UbyU



def compute_sim_cosine(R):
    # 평점 부여 여부를 0/1로 표시하는 행렬을 작성
    num_users = R.shape[0]
    ones = csr_matrix((np.ones(R.nnz), (R.nonzero()[0], R.nonzero()[1])), shape=R.shape)
    print(ones)
    # 주의: ones는 Dense Matrix가 아니라 CSR임!
    # Ri가 부여한 평점을 다른 고객이 본 영화들로 filter한 행렬을 뽑고 싶다!
    
    # norm(행렬, ord=제곱근, axis=계산할 차원)

    # 유사도 분모를 den에 저장하되, 분모가 0인 부분을 1로 채우기 (div by 0)
    # 분모가 0이 되어도 어차피 분자로 인해 낮은 sim값을 갖게 됨 (문제 없음)
    UbyU = (R * R.T).toarray()
    UbyU[range(num_users), range(num_users)] = 0

    sim = np.zeros((num_users, num_users))
    for i in range(num_users):
        both = ones[i].reshape(1, -1).multiply(ones)
        norm_i = norm(both.multiply(R[i].reshape(1, -1)), ord=2, axis=1)
        norm_others = norm(both.multiply(R), ord=2, axis=1)
        den = norm_i * norm_others
        den[den == 0] = 1
        sim[i] = UbyU[i] / den
    
    return sim


def predict(R, K):
    # 행: 유저, 열: 항목
    num_users = R.shape[0]
    num_items = R.shape[1]

    sim = compute_sim_cosine(R)
    print(sim)
    topk = sim.argsort(axis=1)[:, -K:]  # 가장 가까운 K개를 꼽기

    # u by i 0 행렬 만들기 
    R_predicted = np.zeros((num_users, num_items))
    for i in range(num_users):
        w = sim[i, topk[i]]         # 가중치
        print(w.sum(), "가중치합")
        for j in range(K):
            R_predicted[i] += (w[j] * R[topk[i, j]])    # 가중 Sumproduct을 R_predicted[i]에 저장
        R_predicted[i] /= w.sum()   # 당연히 가중치총합으로 나눠줘야 점수가 나오겠지?

    return R_predicted