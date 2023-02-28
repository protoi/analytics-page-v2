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


def gen_template():
    return {
        "_id": "63e61736d683c3c7e56fdf4a",
        "Destination_Phone_number": "917044174529",
        "Query_Message": "Give me the actors of 'Jaws'",
        "EntityIntent_tuple": {
            "entities": {"genre": [], "actor": [], "daterange": [], "moviename": ["Jaws"]},
            "intents": "message.get_actor" if random.randint(1, 10) != 5 else "message.error",
            "score":  "0.9011704848033614"}, "Response_Body": "Cast of Jaws:\nActors: Roy Scheider, Robert Shaw, Richard Dreyfuss, Murray Hamilton, Jay Mello.\nActress: Lorraine Gary, Susan Backlinie, Lee Fierro, Fritzi Jane Courtney, Belle McDonald.\nOthers: Christopher Sands, Rex Trailer.", "Time_Stamp":  "1676023605000", "Entity_valuelist": [{"male": ["Roy Scheider", "Robert Shaw", "Richard Dreyfuss", "Murray Hamilton", "Jay Mello", "Jeffrey Kramer", "Carl Gottlieb", "Craig Kingsbury", "Phil Murray", "Ted Grossman", "Robert Nevin", "Peter Benchley", "David Engelbach", "Joseph Oliveira", "Joe La Creta", "Steven Spielberg"], "female":["Lorraine Gary", "Susan Backlinie", "Lee Fierro", "Fritzi Jane Courtney", "Belle McDonald", "Dorothy Fielding", "Beverly Powers", "Ayn Ruymen", "Denise Cheshire"], "others":["Christopher Sands", "Rex Trailer"]}]}


for index, m in enumerate(generated_data):
    if m['monthly_query_count'] != 0:
        m['monthly_queries'] = [{"day": x+1, "daily_query_count": random.randint(
            0, 4), "daily_queries": []} for x in range(month_data[index]["days"])]
        for index_2, d in enumerate(m['monthly_queries']):
            if d['daily_query_count'] != 0:

                d['daily_queries'] = [gen_template()
                                      for _ in range(random.randint(0, 10))]

for m in generated_data:
    counts = 0
    for d in m['monthly_queries']:
        d['daily_query_count'] = len(d['daily_queries'])
        counts += d['daily_query_count']
    m['monthly_query_count'] = counts


with open("sample_data.json", "w") as sample:
    json.dump(generated_data, sample, indent=2)
