Docker Commands Reference Guide
---

## Basic Commands

###### Note: Use linux based or wsl terminal to run below commands. You can use vs code or Intlij inbuild wsl based terminal.

### Stop all containers

```bash
docker stop $(docker ps -a -q)
```

### Remove all containers

```bash
docker rm $(docker ps -a -q)
```

### Stop and remove all containers, then verify

```bash
docker stop $(docker ps -a -q) && docker rm $(docker ps -a -q) && docker ps
```

### Remove specific container

```bash
docker rm container_id
```

### Inspect container

```bash
docker inspect container_id
```

### View container logs since timestamp

```bash
docker logs --since time_stamp container_id
```

### View live logs by service name

```bash
docker logs -f container_name
```

## Docker Compose Commands

### Start Kafka services

```bash
docker compose -f docker-compose-kafka.yml up
```

### Start Kafka services in detached mode

```bash
docker compose -f docker-compose-kafka.yml up -d
```

### Start microservices

```bash
docker compose -f docker-microservices-ecom.yml up -d
```

### Restart broker service

```bash
docker compose -f docker-microserices-ecom.yml restart broker
```

### Start single service from compose file

```bash
docker compose -f docker-microservices-ecom.yml up discovery-server -d
```

### Run minimal microservices

```bash
docker compose -f docker-microservices-ecom-minimal.yml up -d
```

## Building and Updating Services

### Build layered API gateway

```bash
docker build -t apigateway-layred -f Dockerfile.layered .layered
```

### Update single service (discovery-server example)

```bash
docker-compose -f docker-microserices-ecom.yml stop discovery-server
```

```bash
docker-compose -f docker-microserices-ecom.yml build discovery-server
```

```bash
docker-compose -f docker-microserices-ecom.yml up --no-start discovery-server
```

```bash
docker-compose -f docker-microserices-ecom.yml start discovery-server
```

## Service-Specific Commands

### Start Zipkin for distributed tracking

```bash
docker run -d -p 9411:9411 openzipkin/zipkin
```

### Start Redis Cache

```bash
docker run -p 6379:6379 -d redis:latest
```

### Start Eureka Server

```bash
docker run -e eurekaClient.url=http://eureka:password@localhost:8761/eureka/eureka \
          -e eureka.username=eureka \
          -e eureka.password \
          -p 8761:8761 \
          eureka:latest
```
