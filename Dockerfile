FROM node

WORKDIR /app
COPY . .
RUN yarn
RUN yarn generate:certs
CMD ["node" , "."]
EXPOSE 1965