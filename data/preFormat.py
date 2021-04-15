import csv
with open(r'D:\School\Emerging Tech\HealthTrac\data\unprocessed-cleveland.csv','r') as f:
    reader = csv.reader(f, delimiter=',')
    counter =0
    oneCounter =0
    rowList = []

    for row in reader:
        if row[-1] == "0" and counter < 35:
            rowList.append(row)
            counter+=1
        elif row[-1] == '1'and oneCounter <35:
            rowList.append(row)
            oneCounter+=1
        elif row[-1] !="0" and row[-1] !="1":
            rowList.append(row)
    

with open(r'D:\School\Emerging Tech\HealthTrac\data\processed-cleveland.csv','w', newline='') as f:
    writer = csv.writer(f, delimiter=',')
    for row in rowList:
        writer.writerow(row)
    
    
   

