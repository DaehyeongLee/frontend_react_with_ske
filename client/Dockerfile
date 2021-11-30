# FROM node:14.17.6-alpine as build

# RUN mkdir /app
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json /app/package.json
# RUN npm install --silent

# # 소스를 작업폴더로 복사하고 빌드
# COPY . /app
# RUN npm run build

# FROM nginx:latest

# RUN rm -rf /etc/nginx/conf.d
# COPY nginx /etc/nginx

# COPY --from=build /app/build /usr/share/nginx/html

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM node:14.17.6-alpine

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install

CMD ["npm", "start"]