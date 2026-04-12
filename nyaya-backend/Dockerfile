# ==========================================
# STAGE 1: Dependency Caching & Build
# ==========================================
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /build

# 1. Dependency Caching: Copy only the pom.xml first to leverage Docker layer caching.
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 2. Build the application
COPY src ./src
RUN mvn clean package -DskipTests

# 3. Extract the Spring Boot layered JAR
RUN java -Djarmode=layertools -jar target/*.jar extract

# ==========================================
# STAGE 2: Optimized Runtime
# ==========================================

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# 1. Enterprise Security: Run as a non-root user
RUN addgroup -S nyayagroup && adduser -S nyayauser -G nyayagroup
USER nyayauser:nyayagroup

# 2. Copy the layers from the builder stage in order of change frequency.
COPY --from=builder /build/dependencies/ ./
COPY --from=builder /build/spring-boot-loader/ ./
COPY --from=builder /build/snapshot-dependencies/ ./
COPY --from=builder /build/application/ ./

EXPOSE 8080

# 3. Container-Aware JVM Launch
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-XX:+UseG1GC", "org.springframework.boot.loader.launch.JarLauncher"]