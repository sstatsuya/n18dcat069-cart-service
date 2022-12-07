FROM node:16
RUN mkdir /app
ADD . /app
WORKDIR /app
CMD node src/index.js --bind 0.0.0.0:$PORT