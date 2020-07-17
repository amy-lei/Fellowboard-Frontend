FROM node
RUN npm install -g serve
WORKDIR /app
COPY ./build .
CMD ["serve", "-s", "build", "-l", "$PORT"]