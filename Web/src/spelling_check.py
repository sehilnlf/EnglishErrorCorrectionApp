import requests
import difflib
import sys
import json

raw_url = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt'
response = requests.get(raw_url)

if response.status_code == 200:
    content = response.text
else:
    print('Failed to retrieve the file from GitHub:', response.status_code)
    sys.exit(1)

# Stopwords
words = content.split('\n')
words = list(map(lambda x: x[:-1], words))

def spelling_check(text):
    text = text.lower()
    results = []

    for word in text.split():
        if word not in words:
            suggestions = difflib.get_close_matches(word, words, n=5, cutoff=0.8)
            if suggestions:
                results.append({
                    "word": word,
                    "suggestions": suggestions
                })
            else:
                results.append({
                    "word": word,
                    "suggestions": []
                })
    return results

if __name__ == "__main__":
    text = sys.argv[1]
    result = spelling_check(text)
    print(json.dumps(result))
