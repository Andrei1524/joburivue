FROM node:16.18.1

WORKDIR /app

#copy from root folder to the docker image(last dot)
#only copy if new packages were installed in local PC
# * is to copy package.lock
COPY package*.json ./

COPY client/package*.json client/
RUN npm run install-client --only=production

COPY server/package*.json server/
COPY server/tsconfig.json /server/
RUN npm run install-server --only=production
# RUN npm run build --prefix server

#build our client (this will put build files into the /public IN server)
COPY client/ client/
RUN npm run build-prod --prefix client

COPY server/ server/
# COPY server/.env server/server-dist

## use this USER for security (least permission node user has)
USER node


CMD ["npm", "run", "start"]

# port
EXPOSE 4000
