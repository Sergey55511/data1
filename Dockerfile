#Creates a layer from node:16.13.2 image.
FROM node:16.13.2

#Creates directories
RUN mkdir -p /usr/src/app

#Sets an environment variable
ENV PORT 3000

#Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD commands
WORKDIR /usr/src/app


#Copy new files or directories into the filesystem of the container
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
COPY prisma /usr/src/app


RUN npm set strict-ssl false
#Execute commands in a new layer on top of the current image and commit the results
RUN npm install

ARG APP_VERSION
ENV APP_VERSION=${APP_VERSION}
ENV NODE_TLS_REJECT_UNAUTHORIZED 0

RUN npx prisma generate

##Copy new files or directories into the filesystem of the container
COPY . /usr/src/app

ARG APP_VERSION
ENV APP_VERSION=${APP_VERSION}
#Execute commands in a new layer on top of the current image and commit the results
RUN npm run build

#Informs container runtime that the container listens on the specified network ports at runtime
EXPOSE 3000

#RUN npm run prismaUpdate
#Allows you to configure a container that will run as an executable
ENTRYPOINT ["npm", "start"]
