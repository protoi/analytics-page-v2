import random
import json

month_data = [
    {"name": "January", "days": 31},
    {"name": "February", "days": 28},
    {"name": "March", "days": 31},
    {"name": "April", "days": 30},
    {"name": "May", "days": 31},
    {"name": "June", "days": 30},
    {"name": "July", "days": 31},
    {"name": "August", "days": 31},
    {"name": "September", "days": 30},
    {"name": "October", "days": 31},
    {"name": "November", "days": 30},
    {"name": "December", "days": 31}
]

generated_data = [
    {
        "month": x["name"],
        "monthly_query_count": random.randint(0, 4),
        "monthly_queries": []
    }
    for x in month_data]

for index, m in enumerate(generated_data):
    if m['monthly_query_count'] != 0:
        m['monthly_queries'] = [{"day": x+1, "daily_query_count": random.randint(
            0, 4), "daily_queries": []} for x in range(month_data[index]["days"])]
        for index_2, d in enumerate(m['monthly_queries']):
            if d['daily_query_count'] != 0:
                d['daily_queries'] = [{"message": "hello"}
                                      for _ in range(random.randint(0, 10))]

for m in generated_data:
    counts = 0
    for d in m['monthly_queries']:
        d['daily_query_count'] = len(d['daily_queries'])
        counts += d['daily_query_count']
    m['monthly_query_count'] = counts


with open("sample_data.json", "w") as sample:
    json.dump(generated_data, sample, indent=2)
