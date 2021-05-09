import pandas as pd
import sys
import os
import os.path
import matplotlib.pyplot as plt
import math
import requests

data = pd.read_csv("CN-Reanalysis-daily-2013010100.csv",index_col=None)

KEY = '3804e3cd4ba97cf7eeedeb1118b40f4e'
url = 'https://restapi.amap.com/v3/geocode/regeo?parameters'
RADIUS = 300000
OUTPUT = 'json'
EX = 'all'

print(data.columns.tolist())