# English-Grammar-checking-tool
[Ongoing]
English Grammar Correction App using transformers model: facebook/bart-large. Re and difflib is to preprocess.

#### Inference

This example demonstrates how to use the `transformers` library to test this model.

```python
from transformers import pipeline

# Load the pre-trained model
corrector = pipeline("text2text-generation", model="sehilnlf/model_v6")

MAX_LENGTH = 512

# Define the text samples
texts = ['Hope you would be okay.']

# Batch prediction
predictions = corrector(texts, max_length=MAX_LENGTH)

# Collect and print predictions
predicts = []
for text, pred in zip(texts, predictions):
    predicts.append(pred['generated_text'])
    print("- " + pred['generated_text'])
