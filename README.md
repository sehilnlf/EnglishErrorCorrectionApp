# English Error Correction tool
English Error Correction tool using transformers model: **facebook/bart-large** to correct grammar error. **Re and difflib library** is to correct typing error.


### Inference

This example demonstrates how to use the `transformers` library to test model.

```python
from transformers import pipeline

# Initialize the text correction pipeline
corrector = pipeline("text2text-generation", model="sehilnlf/model_v6")

# Maximum length for the generated text
MAX_LENGTH = 512

# Define the text samples to be corrected
texts = ["Hope you would be okay."]

# Generate corrected text for each sample
predictions = corrector(texts, max_length=MAX_LENGTH)

# Initialize a list to store the corrected texts
corrected_texts = []

# Print and store each corrected text
for text, prediction in zip(texts, predictions):
    corrected_text = prediction['generated_text']
    corrected_texts.append(corrected_text)
    print(f"- {corrected_text}")
```

### How to run app and test
- Step 1: Clone this repository to your local
- Step 2: cd to folder Web/
- Step 3: Run command: 
```javascript
npm run start
```
