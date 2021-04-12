from flask import Blueprint, Response, request, jsonify
import mariadb
from ..models.sailor import sailor as sailorSchema
from ..config.db import cur

router = Blueprint("router")


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


@router.route('/sailor', methods=['POST'])
def postSailor():
    if request.method == "POST":
        try:
            req_data = request.get_json()
            sailor = {}
            sailor['SNAME'] = req_data['SNAME']
            sailor['RATING'] = req_data['RATING']
            sailor['AGE'] = req_data['AGE']

            sailorSchema.validate(sailor)

            insertId = cur.execute("INSERT INTO SAILOR(SNAME, RATING, AGE) values(?, ?, ?)",
                                   [sailor["SNAME"], sailor["RATING"], sailor["AGE"]])

            data: any = cur.execute(
                "SELECT * FROM SAILOR WHERE SID = ?", [insertId])

            res = {"data": data,
                   "message": "Sailor Successfully created"}
            return res, 200
        except Exception as e:
            print(Exception)
            return jsonify(e), 500


@router.route('/sailor/<id>', methods=['GET', 'PUT', 'DELETE'])
def getSailor(id):
    if request.method == "GET":
        try:
            data: any = cur.execute("SELECT * FROM SAILOR WHERE SID = ?", [id])

            if len(data) == 0:
                res = {"message": "No Sailor Found"}
                return res, 404

            res = {"data": data[0], "message": "Sailor Successfully Fetched"}

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

            data: any = cur.execute("UPDATE SAILOR SET SNAME = ?, RATING = ?, AGE = ? WHERE SID = ?",
                                    [sailor["SNAME"], sailor["RATING"], sailor["AGE"], id])

            res = {"data": data,
                   "message": " Sailor Successfully Updated"}

            return res, 200
        except Exception as e:
            print(e)
            res = jsonify(e)
            return res, 500

    if request.method == 'DELETE':
        try:
            data: any = cur.execute("DELETE FROM SAILOR WHERE SID = ?", [id])

            res = {"data": data,
                   "message": "Sailor Successfully Deleted"}
            return res, 200
        except Exception as e:
            print(e)
            res = jsonify(e)
            return res, 500
