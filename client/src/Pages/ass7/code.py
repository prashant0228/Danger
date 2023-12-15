from ucimlrepo import fetch_ucirepo
from mlxtend.frequent_patterns import apriori
from mlxtend.frequent_patterns import association_rules
import pandas as pd

def load_congressional_voting_records():
    # Fetch dataset
    congressional_voting_records = fetch_ucirepo(id=105)

    # Extract features and targets
    X = congressional_voting_records.data.features
    y = congressional_voting_records.data.targets

    # Combine features and targets into a single DataFrame
    data = pd.concat([X, pd.DataFrame(y, columns=['Class'])], axis=1)

    # Convert categorical columns to boolean using one-hot encoding
    data = pd.get_dummies(data, drop_first=True)

    return data

def find_frequent_itemsets(data, support_threshold):
    frequent_itemsets = apriori(data, min_support=support_threshold, use_colnames=True)
    return frequent_itemsets

def generate_association_rules(frequent_itemsets, confidence_threshold):
    rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=confidence_threshold)
    return rules

def run_experiments(data, support_values, confidence_values):
    results = []

    for support in support_values:
        frequent_itemsets = find_frequent_itemsets(data, support)

        for confidence in confidence_values:
            rules = generate_association_rules(frequent_itemsets, confidence)

            results.append({
                'Support': support,
                'Confidence': confidence,
                'FrequentItemsets': frequent_itemsets.shape[0],
                'TotalRules': rules.shape[0]
            })

    # Tabulate the results
    results_df = pd.DataFrame(results)
    print(results_df)

# Load Congressional Voting Records dataset
congressional_data = load_congressional_voting_records()

# Define support and confidence values
support_values = [0.1, 0.2, 0.3]
confidence_values = [0.5, 0.6, 0.7]

# Run experiments
run_experiments(congressional_data, support_values, confidence_values)
