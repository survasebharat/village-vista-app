# SmartVillage Backend (scaffold)

This folder contains a multi-module Maven scaffold for the SmartVillage backend.

Modules:
- village-core-service
- notice-board-service
- services-directory-service
- rating-service
- feedback-service
- payment-service
- auth-service
- dev-work-service
- common-utils

Assumptions made in this scaffold:
- Using Maven for builds (multi-module pom).
- Spring Boot 3.x (Java 21) for the service modules.
- Scala / Akka modules will be added under `rating-service` or `common-utils` later as required.

Quick start (local dev):
1. Build all modules: mvn -T1C clean package
2. Run a module (example auth-service): mvn -pl auth-service spring-boot:run

Next steps:
- Implement service controllers, repositories, and models.
- Configure PostgreSQL connection in `application.yml` or environment variables.
- Add CI/CD and deploy to Render/Railway as desired.
