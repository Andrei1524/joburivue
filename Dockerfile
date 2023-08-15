FROM node:16.18.1

WORKDIR /app

#copy from root folder to the docker image(last dot)
#only copy if new packages were installed in local PC
# * is to copy package.lock
COPY package*.json ./
RUN npm install

COPY client/package*.json client/
RUN npm run install-client

COPY server/package*.json server/
COPY server/tsconfig.json /server/
RUN npm run install-server --only=production
# RUN npm run build --prefix server

#build our client (this will put build files into the /public IN server)
COPY client/ client/
RUN npm run build-prod --prefix client

COPY server/ server/
RUN npm run deploy

## use this USER for security (least permission node user has)

# port
EXPOSE 3000
EXPOSE 4000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

RUN mkdir -p ./uploads
RUN chown node ./uploads
USER node

CMD ["npm", "run", "start"]


