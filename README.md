支持的功能：

- 增加一个待办事项
- 删除一个待办事项
- 标记一个待办事项为已完成
- 编辑一个待办事项的具体内容
- 列出所有的待办事项
- 列表界面支持翻页
- 待办事项可以设置优先级
- 待办事项可以设置expire date
- 支持按照优先级，expire date，排序


---
- addTask

![addTask](addTask.gif)

- deleteTask

![deleteTask](deleteTask.gif)

- mark as Done

![markDone](markDone.gif)

- edit a Task

![edit](editTask.gif)

- Order

![order](order.gif)

# How to Run it on your Server

- Install [PostgreSQL](https://www.postgresql.org)

- Edit Django `setting.py`
```Python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'your database name',  # database name
        'USER': 'zengtong',  # username
        'PASSWORD': '1',
        'HOST': '',  # default localhost
        'PORT': '5432',
    }
}
```
- Import Dependencies
```
pip install -r requirements.txt

python manage.py makemigrations

python manage.py migrate

python manage.py runserver

cd web

npm install

npm run dev
```