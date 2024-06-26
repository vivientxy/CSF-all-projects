# Build Angular project:
FROM node:21 AS ng-builder

RUN npm i -g @angular/cli

WORKDIR /ngapp

COPY frontend/angular.json .
COPY frontend/package*.json .
COPY frontend/tsconfig.* .
COPY frontend/src src

RUN npm ci && ng build

# Build SpringBoot project:
FROM maven:3-eclipse-temurin-21 AS sb-builder

WORKDIR /sbapp

COPY backend/mvnw .
COPY backend/mvnw.cmd .
COPY backend/pom.xml .
COPY backend/.mvn .mvn
COPY backend/src src

COPY --from=ng-builder /ngapp/dist/frontend/browser /src/main/resources/static

RUN mvn package -Dmaven.test.skip=true

# Build Java .jar file
FROM openjdk:21-jdk-bullseye

WORKDIR /app 

COPY --from=sb-builder /sbapp/target/day39-workshop-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=8080
EXPOSE ${PORT}

# Environment variables:
ENV S3_ACCESS_KEY=
ENV S3_SECRET_KEY=
ENV MYSQL_URL=
ENV MYSQLUSER=
ENV MYSQLPASSWORD=

# Run the program
ENTRYPOINT SERVER_PORT=${PORT} java -jar app.jar