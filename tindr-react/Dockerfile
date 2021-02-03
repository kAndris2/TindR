FROM node:lts-alpine3.12
# set working directory
WORKDIR /app

ARG APP_IP
ENV REACT_APP_IP=$APP_IP
ARG CHAT_IP
ENV REACT_APP_CHAT_SERVER_IP=$CHAT_IP

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn add react-scripts
RUN yarn install --silent

# add app
COPY . ./
RUN mv envexample .env
RUN sed -i -e 's~appip~'"$(printenv REACT_APP_IP)"'~' .env
RUN sed -i -e 's~chatserverip~'"$(printenv CHAT_SERVER_IP)"'~' .env

# start app
CMD ["yarn", "start"]
