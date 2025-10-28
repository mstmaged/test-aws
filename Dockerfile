# FROM node:18

# WORKDIR /app

# COPY package.json .

# ARG NODE_ENV
# RUN if [ "NODE_ENV" = "Production" ]; \
#     then npm install --only=production; \
#     else npm install; \
#     fi

# COPY . . 

# ENV CHOKIDAR_USEPOLLING=true

# EXPOSE 4000

# CMD ["npm", "run", "dev"]


# write base stage عشان لو شغال بحاجة مثلا زي بايثون محتاج نعمل انستول لشوية حاجات علي الكونتينير بدل ما تقعد تكرر الحاجات دي هنا و هنا نعمل الباز استدج
# Multi-stage build

FROM node:18 as base 

FROM base as development
WORKDIR /app
COPY package.json .
RUN npm install
COPY . . 
ENV CHOKIDAR_USEPOLLING=true
EXPOSE 4000
CMD ["npm", "run", "dev"]



FROM base as production
WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . . 
ENV CHOKIDAR_USEPOLLING=true
EXPOSE 4000
CMD ["npm", "start"]