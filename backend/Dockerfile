FROM debian:bullseye

WORKDIR /app

RUN apt update && apt install python3 python3-venv  -y

RUN python3 -m venv venv

COPY requirement.txt .

RUN . venv/bin/activate && pip install -r requirement.txt

COPY . .

# RUN chmod +x setup.sh

EXPOSE 8000

CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "mysite.asgi:application"]

