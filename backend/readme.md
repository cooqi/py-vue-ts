admin.py后台启动文件
YMLS 是Swagger（flasgger）接口文档说明文档
config.py数据库配置
```
class User(db.Model):  # 创建类User
# 插入功能
user = User(username='15',password='12')
db.session.add(user)
db.session.commit()

# 查询功能
user=User.query.filter(User.username=="15").first()
print(user.username,user.password)

# 修改功能
user=User.query.filter(User.username=="15").first()
user.password='888'
db.session.commit()

# 删除功能
user=User.query.filter(User.username=="15").first()
db.session.delete(user)
db.session.commit()
```