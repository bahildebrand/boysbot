FROM node:18

COPY entry.sh /app/entry.sh

WORKDIR /app
RUN ["chmod", "+x", "/app/entry.sh"]

ENTRYPOINT ["/app/entry.sh"]
