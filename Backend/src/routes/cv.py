from __main__ import app, mongo
from .errors import not_found, bad_request, internal_server_error

from flask import request, Response
from bson import json_util
from bson.objectid import ObjectId
import json, datetime, re

CV = mongo.db.CV
Jobs = mongo.db.jobs

# Agregar un usuario nuevo
@app.route('/cv', methods = ['POST'])
def create_cv():
    personalInfo = request.json['personalInfo']
    education = request.json['education']
    laboral = request.json['laboral']
    
    personalInfo = {key: value.strip() if isinstance(value, str) else value for key, value in personalInfo.items()}
    if personalInfo and education and laboral:
        cv = CV.insert(
            {'personalInfo': personalInfo, 'education': education, 'laboral': laboral}
        )
        minDegree = min(education, key = lambda x: int(x['degree']))
        
        jobs = Jobs.find({'$and': [
            {'profession': re.compile('^' + re.escape(personalInfo['profession']) + '$', re.IGNORECASE)},
            {'schooling': {'$lte': minDegree['degree']}},
            {'experience': {'$lte': personalInfo['experience']}}
            ]})
        
        jobs = json.loads(json_util.dumps(jobs))
        cvId = json.loads(json_util.dumps(cv))['$oid']

        if len(jobs) > 0:
            for job in jobs:
                job['matchedP'] = 50
                job['cvId'] = cvId
                    
                if matchAge(job['age'], personalInfo['birthdate']):
                    job['matchedP'] += 16
                    
                job['matchedP'] += matchLanguges(job['languages'], personalInfo['languages'])
                
                job['matchedP'] += matchAptitudes(job['aptitudes'], personalInfo['aptitudes'])
                
                Jobs.update_one({'_id': ObjectId(job['_id']['$oid'])}, {'$inc': {'seen': 1}})
            
            jobs = [job for job in jobs if job['matchedP'] >= 60]
            jobs.sort(key = lambda job: job['matchedP'], reverse = True)
        else: 
            return not_found('Por el momento no hay trabajos con los que seas compatible')

        return Response(json_util.dumps(jobs), mimetype = 'application/json')
    else:
        return bad_request()

def matchSchooling(jSchool, cSchools):
    for school in cSchools:
        if school['degree'] >= jSchool:
            return True
            
    return False

def matchAge(range, birthdate):
    ind = range.find('-')
    minA = int(range[:ind])
    maxA = int(range[ind + 1:])
    birthdate = datetime.datetime.strptime(birthdate, '%d/%M/%Y')
    age = datetime.datetime.now().year - birthdate.year

    if minA < age and maxA > age:
        return True

    return False

def matchLanguges(jLanguages, cLanguages):
    percent = 17 / len(jLanguages)
    matchedP = 0

    for JLanguage in jLanguages:
        for cLanguage in cLanguages:
            if JLanguage['language'] == cLanguage['language']:
                matchedP += percent

    return matchedP

def matchAptitudes(jAptitudes, cAptitudes):
    percent = 17 / len(jAptitudes)
    matchedP = 0

    for JAptitude in jAptitudes:
        for cAptitude in cAptitudes:
            if JAptitude['aptitude'] == cAptitude['aptitude']:
                matchedP += percent

    return matchedP

# Mostrar cv
@app.route('/cv/<id>', methods = ['GET'])
def get_cvs(id):
    jobs = Jobs.    find_one({'_id': ObjectId(id)})
    jobs = json.loads(json_util.dumps(jobs))

    if len(jobs['cvs']) > 0:
        cvs = []

        for cvId in jobs['cvs']:
            cv = CV.find_one({'_id': ObjectId(cvId)})
            cvs.append(json.loads(json_util.dumps(cv)))

        return Response(json_util.dumps(cvs), mimetype = 'application/json')
    else:
        return not_found('No hay aplicantes para este trabajo')

@app.route('/cv/match/<id>/<cv>', methods=['POST'])
def match_job(id, cv):
    jb = request.json
    del jb['_id'], jb['matchedP'], jb['cvId']
    job = Jobs.update_one({'_id': ObjectId(id)}, {'$set': jb})

    if job.matched_count > 0:
        if job.modified_count > 0:
            return {'message': 'Job succesfully matched'}
        else:
            return internal_server_error('Se produjo un error al aplicar a este trabajo')
    else:
        return not_found('No se encontró el trabajo al que desea aplicar')
