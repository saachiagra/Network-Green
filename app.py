from flask import Flask, render_template, request, jsonify
import googlemaps

app = Flask(__name__)

# Enter your Google Maps API key here
api_key = "AIzaSyDp2sWaBCBVR0P3katwTumON1JbB5Iw1aA"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/restaurants", methods=["POST"])
def restaurants():
    zip_code = request.form["zipcode"]

    gmaps = googlemaps.Client(key=api_key)
    geocode_result = gmaps.geocode(zip_code)
    lat_lng = geocode_result[0]['geometry']['location']
    location = (lat_lng['lat'], lat_lng['lng'])

    restaurants = gmaps.places_nearby(location=location, radius=500, type='restaurant')

    return render_template("restaurants.html", restaurants=restaurants['results'], location=location)

if __name__ == "__main__":
    app.run(debug=True)
