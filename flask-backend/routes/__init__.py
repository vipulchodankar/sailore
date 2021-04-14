from flask import Blueprint, Response, request, jsonify
import mariadb
from ..models.sailor import sailor as sailorSchema
from ..config.db import conn

cur = conn.cursor(named_tuple=True)

router = Blueprint("router", __name__,  url_prefix="/api")


@router.route('/createSailorTable', methods=['PATCH'])
def createSailorTable():
    try:
        data = cur.execute(
            "CREATE TABLE SAILOR (SID INT PRIMARY KEY AUTO_INCREMENT, SNAME VARCHAR(64), RATING INT, AGE INT)")
        res = {"data": data,
               "message": "Table Created"}
        return res, 200
    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")
        res = {"message": "Error connecting to MariaDB"}
        return res, 409


@router.route('/sailor', methods=['POST', 'GET'])
def Sailor():
    if request.method == "POST":
        try:
            req_data = request.get_json()
            sailor = {}
            sailor['SNAME'] = req_data['SNAME']
            sailor['RATING'] = req_data['RATING']
            sailor['AGE'] = req_data['AGE']

            sailor = sailorSchema.validate(sailor)
            cur.execute("INSERT INTO SAILOR (SNAME, RATING, AGE) VALUES (?, ?, ?)",
                        (sailor['SNAME'], sailor['RATING'], sailor['AGE']))
            conn.commit()

            insertID = cur.lastrowid
            cur.execute(
                "SELECT * FROM SAILOR WHERE SID =?", (insertID,))

            row = cur.fetchone()
            data = []
            sailor = {}

            sailor["SNAME"] = row[1]
            sailor["RATING"] = row[2]
            sailor["AGE"] = row[3]
            data.append(sailor)

            res = {"data": data,
                   "message": "Sailor Successfully Added"}
            return res, 200
        except Exception as e:
            print(Exception)
            return jsonify(e), 500

    if request.method == "GET":
        try:
            cur.execute("SELECT * FROM SAILOR")
            data = []
            sailor = {}
            rows = cur.fetchall()

            for row in rows:
                sailor = {}
                sailor["SID"] = row.SID
                sailor["SNAME"] = row.SNAME
                sailor["RATING"] = row.RATING
                sailor["AGE"] = row.AGE
                data.append(sailor)

            res = {"data": data,
                   "message": "Sailors Successfully fetched"}
            return res, 200
        except Exception as e:
            print(e)
            res = jsonify(e)
            return e, 500


@router.route('/sailor/<id>', methods=['GET', 'PUT', 'DELETE'])
def getSailor(id):
    if request.method == "GET":
        try:
            cur.execute("SELECT * FROM SAILOR WHERE SID = ?", [id])

            row = cur.fetchone()

            if not row:
                res = {"message": "No Sailor Found"}
                return res, 404

            data = {}
            data["SID"] = row.SID
            data["SNAME"] = row.SNAME
            data["RATING"] = row.RATING
            data["AGE"] = row.AGE

            res = {"data": data, "message": "Sailor Successfully Fetched"}

            return res, 200
        except Exception as e:
            print(e)
            res = jsonify(e)
            return res, 500

    if request.method == "PUT":
        try:
            req_data = request.get_json()
            sailor = {}
            sailor['SNAME'] = req_data['SNAME']
            sailor['RATING'] = req_data['RATING']
            sailor['AGE'] = req_data['AGE']

            sailorSchema.validate(sailor)

            cur.execute("UPDATE SAILOR SET SNAME = ?, RATING = ?, AGE = ? WHERE SID = ?",
                        (sailor["SNAME"], sailor["RATING"], sailor["AGE"], id))

            conn.commit()

            res = {"message": " Sailor Successfully Updated"}

            return res, 200
        except Exception as e:
            print(e)
            res = jsonify(e)
            return res, 500

    if request.method == 'DELETE':
        try:
            cur.execute("DELETE FROM SAILOR WHERE SID = ?", [id])

            conn.commit()
            res = {"message": "Sailor Successfully Deleted"}
            return res, 200
        except Exception as e:
            print(e)
            res = jsonify(e)
            return res, 500
