---
title: Fargate
description: Store your Docker images in AWS and run them.
---

### ECR Commands

Commands useful for AWS Elastic Container Registry. This is for storing your Docker images.

- Log in to ECR: `$(aws ecr get-login --no-include-email --region us-west-2)`
- Build your Docker image: `docker build -t <IMAGE_NAME>:latest`
- Tag the Docker image: `docker tag <IMAGE_NAME> <ECR_URL>/<IMAGE_NAME>:latest`
- Push to ECR: `docker push <ECR_URL>/<IMAGE_NAME>:latest` 
