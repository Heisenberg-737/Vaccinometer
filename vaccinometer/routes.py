import json
from flask import request, jsonify, g
from vaccinometer.models import User, Vaccine, Info, db
from vaccinometer import app
import datetime
from datetime import timedelta
from block import addVaccine, addCenter, getMedCenterInfo, getVaccineInfo
import random

# Frontend Routes


@app.route('/', methods=["GET", "POST"])
def catch():
    return app.send_static_file('index.html')


@app.route('/signup', methods=["GET", "POST"])
def catch_signup():
    return app.send_static_file('index.html')


@app.route('/login', methods=["GET", "POST"])
def catch_login():
    return app.send_static_file('index.html')


@app.route('/manufacturer', methods=["GET", "POST"])
def catch_manufacturer():
    return app.send_static_file('index.html')


@app.route('/hospital', methods=["GET", "POST"])
def catch_hospital():
    return app.send_static_file('index.html')


@app.route('/manufacturer/create_record', methods=["GET", "POST"])
def catch_createrecord():
    return app.send_static_file('index.html')


@app.route('/hospital/scan_vaccine', methods=["GET", "POST"])
def catch_scanvaccine():
    return app.send_static_file('index.html')


@app.route('/manufacturer/history', methods=["GET", "POST"])
def catch_history():
    return app.send_static_file('index.html')


@app.route('/know_your_vaccine', methods=["GET", "POST"])
def catch_knowvaccine():
    return app.send_static_file('index.html')


@app.route('/hospital/history', methods=["GET", "POST"])
def catch_hospital_history():
    return app.send_static_file('index.html')

# Backend Routes


@app.route('/backend/getprofilemanu', methods=["GET", "POST"])
def get_profile_manufacturer():
    content = request.get_json()
    uid = content["uid"]
    # print(content)
    # uid = "glyosOgXEhPVgefmJ8fG9j162Ue2"
    row = User.query.filter(User.uid == uid).first()

    List = []
    Dict = {
        'name': row.name
    }
    List.append(Dict)
    return json.dumps(List)


@app.route('/backend/getprofilehosp', methods=["GET", "POST"])
def get_profile_hospital():
    content = request.get_json()
    uid = content["uid"]
    row = User.query.filter(User.uid == uid).first()

    List = []
    Dict = {
        'name': row.name
    }
    List.append(Dict)
    return json.dumps(List)


@app.route('/backend/saveprofilemanu', methods=["POST", "GET"])
def save_profile_manufacturer():
    content = request.get_json()
    uid = content["uid"]
    name = content["name"]
    role = "Manufacturer"
    email = content["email"]
    address = content["address"]

    user = User(uid=uid, name=name,
                role=role, email=email, address=address)

    db.session.add(user)
    db.session.commit()

    return 'New user added', 200


@app.route('/backend/saveprofilehosp', methods=["POST", "GET"])
def save_profile_hospital():
    content = request.get_json()
    uid = content["uid"]
    name = content["name"]
    role = "Hospital"
    email = content["email"]
    address = content["address"]

    user = User(uid=uid, name=name,
                role=role, email=email, address=address)

    db.session.add(user)
    db.session.commit()

    return 'New user added', 200


@app.route('/backend/vaccreate', methods=["POST", "GET"])
def vacCreate():

    content = request.get_json()
    name = content["vaccine_name"]
    mrp = content["MRP"]
    date = content["manufacturing_date"]
    expiry = content["expiry_date"]
    private_key = content["private_key"]
    uid = content["uid"]

    row = User.query.filter(User.uid == uid).first()

    address = row.address

    product_id = random.randint(1000000, 9999999)

    addVaccine(address, private_key, product_id, name, str(date), str(expiry))
    product_id = str(product_id)

    List = []
    Dict = {'product_id': product_id}
    List.append(Dict)

    vacc = Vaccine(product_id=product_id, name=name,
                   mrp=mrp, date=date, expiry=expiry)

    db.session.add(vacc)
    db.session.commit()

    ret = Info(uid=uid, product_id=product_id, date=date)

    db.session.add(ret)
    db.session.commit()

    return json.dumps(List)


@app.route('/backend/hospital', methods=["GET", "POST"])
def retailer():

    content = request.get_json()
    uid = content["uid"]
    productid = content["product_id"]
    product_id = int(productid)
    private_key = content["private_key"]

    date = datetime.datetime.now()
    date = str(date)

    ret = Info(uid=uid, product_id=product_id, date=date)

    db.session.add(ret)
    db.session.commit()

    user = User.query.filter(User.uid == uid).first()
    name = user.name
    address = user.address

    addCenter(address, name, private_key)

    return "Vaccine Added", 200


@app.route('/backend/history', methods=["GET", "POST"])
def history():
    content = request.get_json()
    uid = content["uid"]

    users = Info.query.filter(Info.uid == uid).all()

    List = []
    Dict = {}

    for user in users:
        row = Vaccine.query.filter(
            Vaccine.product_id == user.product_id).first()
        Dict = {
            'product_id': row.product_id,
            'name': row.name,
            'mrp': row.mrp,
            'date': row.date,
            'expiry': row.expiry
        }
        List.append(Dict)

    return json.dumps(List)


@app.route('/backend/public', methods=["GET", "POST"])
def public_info():
    content = request.get_json()
    product_id = content['product_id']
    product_id = int(product_id)

    rows = Info.query.filter(Info.product_id == product_id).all()

    List = []
    Dict = {}

    for row in rows:
        user = User.query.filter(User.uid == row.uid).first()
        Dict = {
            'name': user.name,
            'role': user.role,
            'product_id': row.product_id,
            'date': row.date
        }
        List.append(Dict)

    return json.dumps(List)
