FROM debian:bullseye

WORKDIR /app

RUN apt update && apt install python3 python3-venv  -y

COPY requirement.txt .
RUN python3 -m venv venv; . venv/bin/activate; pip install -r requirement.txt

COPY . .
RUN chmod +x setup.sh

EXPOSE 8000

CMD ["bash", "setup.sh"]