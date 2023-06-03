# 1/8
FROM node:18
# 2/8
ENV APP_HOME /app
# 3/8
WORKDIR $APP_HOME
# 4/8 - Separating this step out (as opposed to only having `COPY . $APP_HOME`) ensures that `npm i` does not have to run every time I change some code.
COPY package.json $APP_HOME
COPY package-lock.json $APP_HOME
# 5/8
RUN npm ci
# 6/8 TODO Failed here: `npm ERR! code UNABLE_TO_GET_ISSUER_CERT_LOCALLY`
COPY . $APP_HOME
# 7/8
EXPOSE 4000
# 8/8
CMD ["npm", "t"]
