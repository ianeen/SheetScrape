from celery import Celery

from celery.utils.log import get_task_logger
logger = get_task_logger(__name__)
from bs4 import BeautifulSoup
import requests, json
import csv
from django.apps import apps

app = Celery('tasks', broker='BROKER HERE')


def update_sheet(sheet):
    url = sheet.url
    automation_dict = json.loads(sheet.cols)
    keys = []
    vals = []
    for key in automation_dict:
        element = automation_dict[key].split(':')[0]
        html_class = automation_dict[key].split(':')[1]
        keys.append(key)
        vals.append(get_value(url, element, html_class))

    with open('temp.csv', 'w', newline='') as csvfile:
        filewriter = csv.writer(csvfile, delimiter=',')
        filewriter.writerow(keys)
        filewriter.writerow(vals)

    upload_new_row('temp.csv')

    
def get_value(url, element, html_class):
    request = requests.get(url)
    soup = BeautifulSoup(request.text, "html.parser")
    return soup.find(element, {'class': html_class}).text


@app.task(name='tasks.run')
def run(model):
    update_sheet(model)

import os
TOKEN = "YOUR TOKEN"
URL2 = "https://api2.dropbase.io/v1/pipeline/generate_presigned_url"

def upload_new_row(file):
    r = requests.post(URL2, params={"token": TOKEN})
    upload = json.loads(r.content)
    print(upload["upload_url"])
    upload = upload["upload_url"]

    r = requests.put(upload, data=open(file, 'rb'))
    print(f'{r}')
    os.remove(file)