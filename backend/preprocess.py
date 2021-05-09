import pandas as pd
import sys
import os
import os.path
import matplotlib.pyplot as plt
import math

dataDir = '../visanalysis/public/data/'
dayDir = 'dataset-day'
hourDir = 'dataset-hour'

# data = pd.read_csv("../data/dataset-day/201301/CN-Reanalysis-daily-2013010100.csv")
# print(data)

def drawSmallMultiples(dataX,dataY,sum,title,pngName):
    fig = plt.figure("subplot")
    num = math.ceil(sum**0.5)
    for i in range(sum):
        fig.add_subplot(num,num,i+1)
        plt.plot(dataX[i],dataY[i])
    fig.suptitle(title)
    plt.savefig(pngName+'.png',dpi=300)
    plt.show()
    # print(21)
data_head = ['PM2.5(微克每立方米)', ' PM10(微克每立方米)', ' SO2(微克每立方米)', ' NO2(微克每立方米)',
 ' CO(毫克每立方米)', ' O3(微克每立方米)', ' U(m/s)', ' V(m/s)', ' TEMP(K)', ' RH(%)',
 ' PSFC(Pa)', ' lat', ' lon']

data_head2 = ['PM2.5(微克每立方米)',
              ' PM10(微克每立方米)', ' SO2(微克每立方米)',
              ' NO2(微克每立方米)', ' CO(毫克每立方米)',
              ' O3(微克每立方米)', ' U(m/s)', ' V(m/s)',
              ' TEMP(K)', ' RH(%)', ' PSFC(Pa)', ' lat',
              ' lon', ' ']

data_head_no_space  = [i.replace(" ","") for i in data_head2]


# print(data_head[0])
# data_head_no_space  = [i.replace(" ","") for i in data_head]
print(data_head_no_space)
typePollution = 5
typeName = "O3"
# os.mkdir(typeName)
# sys.exit(0)
for file in os.listdir(dataDir+dayDir):
    item_data_dir = os.path.join(dataDir,dayDir,file)
    year_dataX = []#记录每一年的所有月份的数据的X轴(每一天有多少条记录)
    year_dataY = []#记录每一年的所有月份的数据的Y轴(每一天的数据)
    sumDay = 0 #记录不同月份的天数
    for item_data_file in os.listdir(item_data_dir):
        print(item_data_file)
        final_data_dir = os.path.join(item_data_dir,item_data_file)
        data = pd.read_csv(final_data_dir, index_col=False, header=0,names=data_head_no_space)
        print(data)
        data.to_csv(final_data_dir,index=None)







        # 可视化的准备
        # dataX = [i for i in range(data.shape[0])]
        # dataY = data[data_head[typePollution]].tolist()
        # year_dataX.append(dataX)
        # year_dataY.append(dataY)
        # sumDay = sumDay+1
        # drawSmallMultiples
    # drawSmallMultiples(year_dataX, year_dataY,sumDay,file+'_'+typeName,file)


#
# def reNameDataCol(fileName):
#
