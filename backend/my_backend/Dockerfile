FROM python:3.11.3

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /backendApp
COPY . /backendApp/
RUN pip install -r requirements.txt


EXPOSE 8000

CMD ["python", "manage.py", "runserver"]