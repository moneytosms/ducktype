import type { Snippet } from "@/types/snippet";

export const mlSnippets: Snippet[] = [
  {
    id: "ml-numpy-softmax",
    title: "Softmax with NumPy broadcasting",
    domain: "backend",
    track: "NumPy",
    language: "Python",
    framework: "NumPy",
    category: "vectorized ops",
    prompt: "Implement a numerically stable softmax using NumPy broadcasting.",
    shikiLang: "python",
    typingFocus: ["broadcasting", "keepdims", "axis argument"],
    code: String.raw`import numpy as np

def softmax(x: np.ndarray, axis: int = -1) -> np.ndarray:
    shifted = x - np.max(x, axis=axis, keepdims=True)
    exp = np.exp(shifted)
    return exp / np.sum(exp, axis=axis, keepdims=True)

logits = np.array([[2.0, 1.0, 0.1], [0.5, 0.5, 0.5]])
probs = softmax(logits)
print(probs.sum(axis=1))`,
  },
  {
    id: "ml-numpy-gradient-descent",
    title: "Linear regression via gradient descent",
    domain: "backend",
    track: "NumPy",
    language: "Python",
    framework: "NumPy",
    category: "from scratch",
    prompt: "Fit a linear regression from scratch with batch gradient descent.",
    shikiLang: "python",
    typingFocus: ["matrix multiply", "loop with range", "in-place update"],
    code: String.raw`import numpy as np

def fit_linear_regression(X: np.ndarray, y: np.ndarray, lr: float = 0.01, epochs: int = 1000):
    n_samples, n_features = X.shape
    weights = np.zeros(n_features)
    bias = 0.0

    for _ in range(epochs):
        y_pred = X @ weights + bias
        error = y_pred - y
        grad_w = (2 / n_samples) * (X.T @ error)
        grad_b = (2 / n_samples) * np.sum(error)
        weights -= lr * grad_w
        bias -= lr * grad_b

    return weights, bias`,
  },
  {
    id: "ml-pandas-groupby-pipeline",
    title: "CSV load with groupby aggregation",
    domain: "backend",
    track: "Pandas",
    language: "Python",
    framework: "Pandas",
    category: "data pipeline",
    prompt: "Load a CSV, filter rows, and aggregate with groupby.",
    shikiLang: "python",
    typingFocus: ["method chaining", "boolean masks", "named aggregation"],
    code: String.raw`import pandas as pd

df = pd.read_csv("orders.csv", parse_dates=["order_date"])

summary = (
    df[df["status"] == "completed"]
    .groupby("region")
    .agg(total_revenue=("amount", "sum"), avg_order=("amount", "mean"), orders=("order_id", "count"))
    .sort_values("total_revenue", ascending=False)
    .reset_index()
)

print(summary.head(10))`,
  },
  {
    id: "ml-sklearn-train-eval",
    title: "Train/test split and classifier evaluation",
    domain: "backend",
    track: "scikit-learn",
    language: "Python",
    framework: "scikit-learn",
    category: "model training",
    prompt: "Split data, fit a random forest, and print a classification report.",
    shikiLang: "python",
    typingFocus: ["keyword arguments", "sklearn imports", "fit/predict"],
    code: String.raw`from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

clf = RandomForestClassifier(n_estimators=200, max_depth=8, random_state=42)
clf.fit(X_train, y_train)

y_pred = clf.predict(X_test)
print(f"accuracy: {accuracy_score(y_test, y_pred):.4f}")
print(classification_report(y_test, y_pred))`,
  },
  {
    id: "ml-sklearn-pipeline",
    title: "Scaler + logistic regression pipeline",
    domain: "backend",
    track: "scikit-learn",
    language: "Python",
    framework: "scikit-learn",
    category: "pipelines",
    prompt: "Chain a StandardScaler and LogisticRegression into one Pipeline.",
    shikiLang: "python",
    typingFocus: ["pipeline steps", "tuple list literal", "chained calls"],
    code: String.raw`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("classifier", LogisticRegression(max_iter=1000, C=1.0)),
])

scores = cross_val_score(pipeline, X, y, cv=5, scoring="accuracy")
print(f"cv accuracy: {scores.mean():.4f} +/- {scores.std():.4f}")

pipeline.fit(X, y)`,
  },
  {
    id: "ml-pytorch-mlp-module",
    title: "Simple MLP as an nn.Module",
    domain: "backend",
    track: "PyTorch",
    language: "Python",
    framework: "PyTorch",
    category: "model definition",
    prompt: "Define a small multilayer perceptron using PyTorch's nn.Module.",
    shikiLang: "python",
    typingFocus: ["class inheritance", "super().__init__", "nn.Sequential"],
    code: String.raw`import torch
import torch.nn as nn

class MLP(nn.Module):
    def __init__(self, input_dim: int, hidden_dim: int, num_classes: int):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, num_classes),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.net(x)

model = MLP(input_dim=784, hidden_dim=256, num_classes=10)`,
  },
  {
    id: "ml-pytorch-training-loop",
    title: "PyTorch training loop",
    domain: "backend",
    track: "Training loop",
    language: "Python",
    framework: "PyTorch",
    category: "model training",
    prompt: "Write a standard forward/backward/optimizer-step training loop.",
    shikiLang: "python",
    typingFocus: ["nested for loops", "zero_grad", "backward call"],
    code: String.raw`optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
criterion = nn.CrossEntropyLoss()

model.train()
for epoch in range(num_epochs):
    running_loss = 0.0
    for inputs, labels in train_loader:
        inputs, labels = inputs.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        running_loss += loss.item()

    print(f"epoch {epoch + 1}: loss={running_loss / len(train_loader):.4f}")`,
  },
  {
    id: "ml-pytorch-dataset-dataloader",
    title: "Custom Dataset and DataLoader",
    domain: "backend",
    track: "PyTorch",
    language: "Python",
    framework: "PyTorch",
    category: "data loading",
    prompt: "Subclass Dataset and wrap it in a DataLoader for batching.",
    shikiLang: "python",
    typingFocus: ["dunder methods", "class subclassing", "keyword arguments"],
    code: String.raw`from torch.utils.data import Dataset, DataLoader

class TensorDataset(Dataset):
    def __init__(self, features: torch.Tensor, labels: torch.Tensor):
        self.features = features
        self.labels = labels

    def __len__(self) -> int:
        return len(self.features)

    def __getitem__(self, idx: int):
        return self.features[idx], self.labels[idx]

dataset = TensorDataset(X_tensor, y_tensor)
train_loader = DataLoader(dataset, batch_size=64, shuffle=True, num_workers=2)`,
  },
  {
    id: "ml-pytorch-checkpoint",
    title: "Save and load a model checkpoint",
    domain: "backend",
    track: "PyTorch",
    language: "Python",
    framework: "PyTorch",
    category: "checkpointing",
    prompt: "Save training state to disk and restore it later.",
    shikiLang: "python",
    typingFocus: ["dict literals", "torch.save/load", "state_dict"],
    code: String.raw`checkpoint = {
    "epoch": epoch,
    "model_state_dict": model.state_dict(),
    "optimizer_state_dict": optimizer.state_dict(),
    "loss": running_loss,
}
torch.save(checkpoint, "checkpoint.pt")

checkpoint = torch.load("checkpoint.pt", map_location=device, weights_only=True)
model.load_state_dict(checkpoint["model_state_dict"])
optimizer.load_state_dict(checkpoint["optimizer_state_dict"])
start_epoch = checkpoint["epoch"] + 1`,
  },
  {
    id: "ml-numpy-kmeans",
    title: "K-means clustering from scratch",
    domain: "backend",
    track: "NumPy",
    language: "Python",
    framework: "NumPy",
    category: "from scratch",
    prompt: "Implement Lloyd's k-means algorithm using only NumPy.",
    shikiLang: "python",
    typingFocus: ["argmin over axis", "random choice", "convergence check"],
    code: String.raw`import numpy as np

def kmeans(X: np.ndarray, k: int, max_iters: int = 100):
    rng = np.random.default_rng(seed=0)
    centroids = X[rng.choice(len(X), size=k, replace=False)]

    for _ in range(max_iters):
        distances = np.linalg.norm(X[:, None] - centroids[None, :], axis=2)
        labels = np.argmin(distances, axis=1)

        new_centroids = np.array([
            X[labels == i].mean(axis=0) if np.any(labels == i) else centroids[i]
            for i in range(k)
        ])

        if np.allclose(new_centroids, centroids):
            break
        centroids = new_centroids

    return centroids, labels`,
  },
];
