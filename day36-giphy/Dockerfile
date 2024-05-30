# Build Angular project:
FROM node:22 AS ng-builder

RUN npm i -g @angular/cli@17.3.8

WORKDIR /ngapp

COPY frontend/angular.json .
COPY frontend/package*.json .
COPY frontend/tsconfig*.json .
COPY frontend/src src

# && --> if npm ci successful, THEN do ng build
RUN npm ci && ng build

# Build SpringBoot project:
FROM maven:3-eclipse-temurin-21 AS sb-builder

WORKDIR /sbapp

COPY giphy/mvnw .
COPY giphy/mvnw.cmd .
COPY giphy/pom.xml .
COPY giphy/.mvn .mvn
COPY giphy/src src

COPY --from=ng-builder /ngapp/dist/frontend/browser /src/main/resources/static

# RUN chmod a+x /sbapp/mvnw
RUN mvn package -Dmaven.test.skip=true

# Build Java .jar file
FROM openjdk:21-jdk-bullseye

WORKDIR /app 

COPY --from=sb-builder /sbapp/target/giphy-0.0.1-SNAPSHOT.jar app.jar

ENV PORT=8080
EXPOSE ${PORT}

# Declare environment variables:
ENV GIPHY_KEY=

# Run the program
ENTRYPOINT SERVER_PORT=${PORT} java -jar app.jar