import pandas as pd
import sys
import os
import os.path

dayDir = '../data/dataset-day/'
data = pd.read_csv("../data/dataset-day/201301/CN-Reanalysis-daily-2013010100.csv")
print(data)

for file in os.listdir(dayDir):
    print(file)
    data_file = '../data/dataset-day/' + file


