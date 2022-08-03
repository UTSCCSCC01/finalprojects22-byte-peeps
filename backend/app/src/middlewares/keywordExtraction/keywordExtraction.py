from keybert import KeyBERT 
import sys
import json

doc = sys.argv[1]

NUM_KEYWORDS = 50
N_GRAM_MIN = 1
N_GRAM_MAX = 1

kw_model = KeyBERT()
keywords = kw_model.extract_keywords(doc)
stringifiedResult = json.dumps(kw_model.extract_keywords(doc, keyphrase_ngram_range=(N_GRAM_MIN, N_GRAM_MAX), stop_words=None, top_n=NUM_KEYWORDS))

print(stringifiedResult)