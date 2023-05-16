# Dockerfile, Image, Container

FROM python:3.7

# ADD manage.py .

# ADD requirements.txt .

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]