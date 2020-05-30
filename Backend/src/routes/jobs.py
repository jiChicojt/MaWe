from __main__ import app, mongo
from .errors import not_found, bad_request, internal_server_error

from flask import request, jsonify, Response
from bson import json_util
from bson.objectid import ObjectId
import json
import datetime

Jobs = mongo.db.jobs
CVs = mongo.db.CV


# Agregar trabajo nuevo
@app.route('/jobs', methods=['POST'])
def create_jobs():
    name = request.json['name'].strip()
    enterprise = request.json['enterprise'].strip()
    salary = request.json['salary'].strip()
    description = request.json['description'].strip()
    age = request.json['age'].strip()
    experience = request.json['experience']
    profession = request.json['profession'].strip()
    schooling = request.json['schooling']
    languages = request.json['languages']
    aptitudes = request.json['aptitudes']

    if name and enterprise and salary and description and age and profession and schooling:
        id = Jobs.insert(
            {'name': name, 'enterprise': enterprise, 'salary': salary, 'description': description, 'age': age,
             'experience': experience,
             'profession': profession, 'schooling': schooling, 'languages': languages, 'aptitudes': aptitudes,
             'seen': 0, 'matched': 0, 'cvs': []}
        )

        response = {'message': 'El trabajo fue creado exitosamente.'}
        return response
    else:
        return bad_request()


# Mstrar listado de trabajos
@app.route('/jobs/<enterprise>', methods=['GET'])
def get_jobs(enterprise):
    jobs = Jobs.find({'enterprise': enterprise})

    if jobs:
        response = json_util.dumps(jobs)
        return Response(response, mimetype='application/json')
    else:
        return not_found()


@app.route('/jobs/stats/<enterprise>', methods=['GET'])
def get_jobs_stats(enterprise):
    jobs = Jobs.find({'enterprise': enterprise})

    if jobs:
        jobs = list(jobs)
        seen = 0
        matched = 0

        stats = {'totalSeen': 0, 'totalMatches': 0, 'jobs': [],
                 'schooling': {'primaria': 0, 'basicos': 0, 'diversificado': 0, 'universidad': 0}}
        for job in jobs:
            seen += job['seen']
            matched += job['matched']
            stats['jobs'].append({'name': job['name'], 'seen': job['seen'], 'matches': job['matched']})

            for cvId in job['cvs']:
                cv = CVs.find_one({'_id': ObjectId(cvId)})
                max_schooling = max(cv['education'], key=lambda x: x['degree'])

                if max_schooling['degree'] == 1:
                    stats['schooling']['primaria'] += 1
                elif max_schooling['degree'] == 2:
                    stats['schooling']['basicos'] += 1
                elif max_schooling['degree'] == 3:
                    stats['schooling']['diversificado'] += 1
                else:
                    stats['schooling']['universidad'] += 1

        stats['totalSeen'] = seen
        stats['totalMatches'] = matched

        response = json_util.dumps(stats)

        return Response(response, mimetype='application/json')
    else:
        return not_found()


# Eliminar trabajo
@app.route('/jobs/<id>', methods=['DELETE'])
def delete_job(id):
    job = Jobs.delete_one({'_id': ObjectId(id)})

    if job.deleted_count == 1:
        response = jsonify({'message': 'Documento eliminado correctamente'})
        return response
    else:
        return not_found()
