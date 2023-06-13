import requests

url = "https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/zipcode/78717/0"

headers = {
    "X-RapidAPI-Key": "dd5fb89b79msh6373beaf106d4b5p1f8fbcjsn6a74372dc4e9",
    "X-RapidAPI-Host": "restaurants-near-me-usa.p.rapidapi.com"
}

response = requests.get(url, headers=headers)

data = response.json()

location = None 

if "location" in data:
    location = data["location"]
elif "address" in data:
    location = data["address"].get("formatted_address")

print(data)
