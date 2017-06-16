FROM node:6.9.4

RUN mkdir /src

# Provides cached layer for node_modules

ADD package.json /tmp/
RUN cd /tmp && npm install --production --silent #redo
RUN cp -a /tmp/node_modules /src/ #redo

# copy app files into
COPY . /src

WORKDIR /src
ENV NODE_ENV production

EXPOSE 5000
CMD ["npm", "start"]

