FROM node:lts-alpine3.12
# set working directory
WORKDIR /app

ARG APP_IP
ENV BACKEND_APP_IP=$APP_IP
ARG ORIGIN
ENV APP_ORIGIN=$ORIGIN
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i

# add app
COPY . ./
RUN mv envexample .env
RUN sed -i -e 's~appip~'"$(printenv BACKEND_APP_IP)"'~' .env
RUN sed -i -e 's~apporigin~'"$(printenv APP_ORIGIN)"'~' .env

# start app
CMD ["node", "server.js"]
