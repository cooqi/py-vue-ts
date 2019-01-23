import os
DEBUG = True

SECRET_KEY = os.urandom(24)

# 配置和数据库的连接信息
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:root@localhost:3306/cooqihuang?charset=utf8'
SQLALCHEMY_TRACK_MODIFICATIONS = True