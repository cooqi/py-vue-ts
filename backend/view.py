#coding:utf-8
'''
    render_template 是渲染模板用的，这里我们用来返回 index.html
    flask_cors 用来解决跨域的问题
    flasgger 接口文档管理
    flask_sqlalchemy 数据库连接
'''

from flask import Flask, request, session, redirect, url_for, render_template, make_response, jsonify
from flask_cors import CORS
from flasgger import Swagger,swag_from
from flask_sqlalchemy import SQLAlchemy
import config
from datetime import datetime

# 通过 static_folder 指定静态资源路径，以便 index.html 能正确访问 CSS 等静态资源
# template_folder 指定模板路径，以便 render_template 能正确渲染 index.html
#APP = Flask(__name__, static_folder="../distView/static", template_folder="../distView")
APP = Flask(__name__)

CORS(APP)
Swagger(APP)
#swagger展现api接口方法集合，访问/apidocs/即可

APP.config.from_object(config)  # 关联config.py文件进来
db = SQLAlchemy(APP)  # 建立和数据库的关系映射

class User(db.Model):
    __tablename__ = 'user'
    u_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(200), nullable=False)  # 内部使用
    creat_time = db.Column(db.DateTime, default=datetime.now())

    # 密码判断是否正确
    def check_password(self, row_password):
        return self.password == row_password

class Works(db.Model):
    __tablename__ = 'works'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    prj_info = db.Column(db.String(200), nullable=False)
    prj_img = db.Column(db.String(200), nullable=False)  # 内部使用
    start_time = db.Column(db.DateTime, default=datetime.now())
    end_time = db.Column(db.DateTime, default=datetime.now())
    url = db.Column(db.String(200), nullable=False)
    tags = db.Column(db.String(200), nullable=False)
    self_work = db.Column(db.String(200), nullable=False)
    status = db.Column(db.Integer,nullable=False)
    creat_time = db.Column(db.DateTime, default=datetime.now())
    edit_time= db.Column(db.DateTime, default=datetime.now())

    #验证token

class Tag(db.Model):
    __tablename__ = 'tags'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tag_name = db.Column(db.String(200), nullable=False)
    creat_time = db.Column(db.DateTime, default=datetime.now())

class Self(db.Model):
    __tablename__ = 'selfinfo'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False)
    self_introduction = db.Column(db.String(200), nullable=False)
    work_position = db.Column(db.String(200), nullable=False)
    self_work_intro = db.Column(db.String(200), nullable=False)
    github= db.Column(db.String(200), nullable=False)
    blog = db.Column(db.String(200), nullable=False)
    work_year=db.Column(db.String(200), nullable=False)
    edit_time = db.Column(db.DateTime, default=datetime.now())


@APP.route('/workList', methods=['GET'])
@swag_from('YMLS/workList.yml')
def workList():
    status = request.args.get('status', default='')
    page_index = request.args.get('pageIndex', default=1)
    page_size = request.args.get('pageSize', default=10)
    if status=='':
        work = Works.query.filter().order_by(Works.creat_time.desc()).paginate(int(page_index), int(page_size), False)
        all = Works.query.all()
    else:
        work = Works.query.filter(Works.status == status).order_by(Works.creat_time.desc()).paginate(int(page_index), int(page_size), False)
        all = Works.query.filter(Works.status == status).all()

    if work:
        payload = []
        content = {}
        for result in work.items:
            times = ''
            if result.creat_time:
                creat_time = result.creat_time.strftime("%Y-%m-%d %H:%M:%S")
                end_time = result.end_time.strftime("%Y-%m-%d")
                start_time = result.start_time.strftime("%Y-%m-%d")
                edit_time = result.edit_time.strftime("%Y-%m-%d %H:%M:%S") if result.edit_time else ''
            content = {'id': result.id,
                        'prj_info':result.prj_info,
                       'start_time': start_time,
                       'end_time': end_time,
                       'tags': result.tags,
                       'url': result.url,
                       'self_work': result.self_work,
                       'status': result.status,
                       'creat_time': creat_time,
                       'edit_time':edit_time}
            payload.append(content)
            content = {}
        t = {'code': 200, 'data': payload, 'msg': '', 'pageIndex': page_index, 'total': len(all)}
        return jsonify(t)
    return jsonify({'code': 201, 'msg': '请求失败'})

@APP.route('/workDetail', methods=['GET'])
@swag_from('YMLS/workDetail.yml')
def workDetail():
    id = request.args.get('id')
    work = Works.query.filter(Works.id == id).first()  # 作查询，并判断
    if work:
        end_time = work.end_time.strftime("%Y-%m-%d")
        start_time = work.start_time.strftime("%Y-%m-%d")
        content = {'id': work.id,
                   'prj_info': work.prj_info,
                   'start_time': start_time,
                   'end_time': end_time,
                   'tags': work.tags,
                   'url': work.url,
                   'self_work': work.self_work,
                   'status': work.status,
                   'creat_time': work.creat_time
                   }
        t = {'code': 200, 'data': content, 'msg': ''}
        return jsonify(t)
    return jsonify({'code': 201, 'msg': '请求失败'})


@APP.route('/tagList', methods=['GET'])
@swag_from('YMLS/register.yml')
def tagList():
    tag = Tag.query.order_by(Tag.creat_time.desc()).all()
    if tag:
        payload = []
        for result in tag:
            creat_time = result.creat_time.strftime("%Y-%m-%d")
            content = {
                'id': result.id,
                'creat_time': creat_time,
                'tag_name': result.tag_name
            }
            payload.append(content)

        t={'code': 200, 'data': payload, 'msg': ''}
        return jsonify(t)
    return jsonify({'code': 201,  'msg': '请求失败'})


@APP.route('/selfDetail', methods=['GET'])
@swag_from('YMLS/register.yml')
def selfDetail():
    self = Self.query.first()
    if self:
        content={
            'name': self.name,
            'email': self.email,
            'self_introduction': self.self_introduction,
            'work_position':self. work_position,
            'self_work_intro':self.self_work_intro,
            'github':self.github,
            'blog':self.blog,
            'work_year':self.work_year
        }
        t = {'code': 200, 'data': content, 'msg': ''}
        return jsonify(t)
    return jsonify({'code': 201, 'msg': '请求失败'})


if __name__ == '__main__':
    # 开启 debug模式，这样我们就不用每更改一次文件，就重新启动一次服务
    # 设置 host='0.0.0.0'，让操作系统监听所有公网 IP
    # 也就是把自己的电脑作为服务器，可以让别人访问
    APP.run(port=9003,debug=True, host='192.168.0.85')