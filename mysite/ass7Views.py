from itertools import chain, combinations
from collections import defaultdict

# Function to generate frequent itemsets
def get_frequent_itemsets(transactions, min_support):
    item_counts = defaultdict(int)
    for transaction in transactions:
        for item in transaction:
            item_counts[item] += 1

    frequent_items = {frozenset([item]): count for item, count in item_counts.items() if count >= min_support}
    current_frequent_items = frequent_items.keys()
    while current_frequent_items:
        current_frequent_items = generate_candidate_itemsets(current_frequent_items)
        item_counts = defaultdict(int)
        for transaction in transactions:
            for itemset in current_frequent_items:
                if itemset.issubset(transaction):
                    item_counts[itemset] += 1
        current_frequent_items = {itemset: count for itemset, count in item_counts.items() if count >= min_support}
        frequent_items.update(current_frequent_items)

    return frequent_items

# Function to generate candidate itemsets
def generate_candidate_itemsets(itemsets):
    next_itemsets = set()
    for itemset1 in itemsets:
        for itemset2 in itemsets:
            union_set = itemset1.union(itemset2)
            if len(union_set) == len(itemset1) + 1 and all(subset in itemsets for subset in combinations(union_set, len(union_set) - 1)):
                next_itemsets.add(union_set)
    return next_itemsets

# Function to generate association rules
def generate_association_rules(frequent_itemsets, min_confidence):
    rules = []
    for itemset in frequent_itemsets:
        if len(itemset) > 1:
            for item in itemset:
                antecedent = frozenset([item])
                consequent = itemset - antecedent
                confidence = frequent_itemsets[itemset] / frequent_itemsets[antecedent]
                if confidence >= min_confidence:
                    rules.append((antecedent, consequent, confidence))
    return rules

# Function to experiment with different values of support, confidence, and maximum rule length
def experiment_apriori(transactions, min_support_values, min_confidence_values, max_rule_length):
    results = []
    for min_support in min_support_values:
        frequent_itemsets = get_frequent_itemsets(transactions, min_support)
        for min_confidence in min_confidence_values:
            rules = generate_association_rules(frequent_itemsets, min_confidence)
            results.append((min_support, min_confidence, rules))
    return results

# Sample transactions
transactions = [
    {'A', 'B', 'C'},
    {'A', 'B', 'D'},
    {'B', 'C', 'E'},
    {'A', 'B', 'C', 'E'},
    {'A', 'D', 'E'}
]

# Experiment with different values
min_support_values = [2, 3]
min_confidence_values = [0.5, 0.7]
max_rule_length = 2

# Run the experiment
results = experiment_apriori(transactions, min_support_values, min_confidence_values, max_rule_length)

# Tabulate the results
for min_support, min_confidence, rules in results:
    print(f"\nMin Support: {min_support}, Min Confidence: {min_confidence}")
    print("Frequent Itemsets:")
    for itemset, count in get_frequent_itemsets(transactions, min_support).items():
        print(f"{set(itemset)}: {count}")
    print("\nAssociation Rules:")
    for antecedent, consequent, confidence in rules:
        print(f"{set(antecedent)} => {set(consequent)} (Confidence: {confidence:.2f})")
