FROM node

WORKDIR /app
COPY . .
RUN yarn generate:certs
CMD ["node" , "."]
EXPOSE 1965