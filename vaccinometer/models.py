from vaccinometer import db
import datetime


class User(db.Model):
    __tablename__ = 'Roles'
    uid = db.Column(db.String(100), primary_key=True)
    name = db.Column(db.String(100))
    role = db.Column(db.String(100))
    address = db.Column(db.String(100))
    email = db.Column(db.String(100))


class Vaccine(db.Model):
    __bind_key__ = 'vac'
    __tablename__ = 'VaccineTable'
    s_no = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_id = db.Column(db.String(100))
    name = db.Column(db.String(100))
    mrp = db.Column(db.String(100))
    date = db.Column(db.String(100))
    expiry = db.Column(db.String(100))


class Info(db.Model):
    __bind_key__ = 'vac'
    __tablename__ = 'Track'
    s_no = db.Column(db.Integer, primary_key=True, autoincrement=True)
    uid = db.Column(db.String(100))
    product_id = db.Column(db.String(100))
    date = db.Column(db.String(100))
