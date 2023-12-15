import requests
from bs4 import BeautifulSoup
import networkx as nx
import numpy as np

# Function to crawl a page and extract links
def crawl_page(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    links = [a.get('href') for a in soup.find_all('a', href=True)]
    return links

# Function to implement DFS crawler
def dfs_crawler(seed_url, depth, visited, result):
    if depth == 0 or seed_url in visited:
        return
    visited.add(seed_url)
    result.append(seed_url)
    links = crawl_page(seed_url)
    for link in links:
        dfs_crawler(link, depth - 1, visited, result)

# Function to implement BFS crawler
def bfs_crawler(seed_url, depth):
    visited = set()
    result = []
    queue = [(seed_url, 0)]

    while queue:
        current_url, current_depth = queue.pop(0)
        if current_url not in visited and current_depth < depth:
            visited.add(current_url)
            result.append(current_url)
            links = crawl_page(current_url)
            queue.extend((link, current_depth + 1) for link in links)

    return result

# Function to implement PageRank algorithm
def pagerank(graph, damping_factor=0.85, max_iterations=100, tol=1e-6):
    nodes = list(graph.nodes)
    num_nodes = len(nodes)
    transition_matrix = np.zeros((num_nodes, num_nodes))

    for i, node_i in enumerate(nodes):
        for j, node_j in enumerate(nodes):
            if graph.has_edge(node_i, node_j):
                transition_matrix[i, j] = 1 / len(list(graph.neighbors(node_j)))

    rank_vector = np.ones(num_nodes) / num_nodes
    for _ in range(max_iterations):
        next_rank = (1 - damping_factor) + damping_factor * np.dot(transition_matrix, rank_vector)
        if np.linalg.norm(next_rank - rank_vector, 2) < tol:
            break
        rank_vector = next_rank

    return dict(zip(nodes, rank_vector))

# Function to implement HITS algorithm
def hits(graph, max_iterations=100, tol=1e-6):
    hub_scores = {node: 1 for node in graph.nodes}
    authority_scores = {node: 1 for node in graph.nodes}

    for _ in range(max_iterations):
        new_hub_scores = {}
        new_authority_scores = {}

        for node in graph.nodes:
            new_hub_scores[node] = sum(graph[node][neighbor]['weight'] * authority_scores[neighbor] for neighbor in graph.neighbors(node))
            new_authority_scores[node] = sum(graph[neighbor][node]['weight'] * hub_scores[neighbor] for neighbor in graph.neighbors(node))

        hub_norm = np.linalg.norm(list(new_hub_scores.values()), 2)
        authority_norm = np.linalg.norm(list(new_authority_scores.values()), 2)

        hub_scores = {node: score / hub_norm for node, score in new_hub_scores.items()}
        authority_scores = {node: score / authority_norm for node, score in new_authority_scores.items()}

    return hub_scores, authority_scores

# Example usage
seed_url = 'https://www.cricbuzz.com/'
depth = 2

# DFS Crawler
dfs_result = []
dfs_crawler(seed_url, depth, set(), dfs_result)
print("DFS Result:", dfs_result)

# BFS Crawler
bfs_result = bfs_crawler(seed_url, depth)
print("BFS Result:", bfs_result)

# PageRank
graph = nx.DiGraph()
for url in bfs_result:
    links = crawl_page(url)
    graph.add_edges_from([(url, link) for link in links])

pagerank_scores = pagerank(graph)
sorted_pagerank = sorted(pagerank_scores.items(), key=lambda x: x[1], reverse=True)[:10]
print("Top 10 Pages by PageRank:")
for page, score in sorted_pagerank:
    print(f"{page}: {score}")

# HITS
hits_hub, hits_authority = hits(graph)
sorted_hits_hub = sorted(hits_hub.items(), key=lambda x: x[1], reverse=True)[:10]
sorted_hits_authority = sorted(hits_authority.items(), key=lambda x: x[1], reverse=True)[:10]
print("Top 10 Hub Pages:")
for page, score in sorted_hits_hub:
    print(f"{page}: {score}")
print("Top 10 Authority Pages:")
for page, score in sorted_hits_authority:
    print(f"{page}: {score}")
