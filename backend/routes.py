from app import app, db
from model import Friends
from flask import request, jsonify


# Get all friends
@app.route("/api/friends", methods=["GET"])
def get_friends():
    friends = Friends.query.all()
    result = [friend.to_json() for friend in friends]
    return jsonify(result)


print("Routes file loaded")
