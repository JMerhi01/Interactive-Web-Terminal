
# Interactive Web-Terminal Project

## Introduction

Welcome to the Interactive Terminal Website project! This project is an exciting blend of web development skills and cloud architecture, with a focus on AWS services. The core concept revolves around creating an interactive, dynamic resume as a terminal-style website, backed by robust backend infrastructure.

## Project Description

In this project, I developed an interactive resume website using HTML, CSS, and JavaScript, hosted on Amazon S3. The site features a visitor counter that interacts with a backend database, showcasing my capabilities in managing dynamic content on cloud-based web hosting.

## Key Features

- **HTML Resume**: A web-based resume coded in HTML.
- **CSS Styling**: Enhanced visual appeal using CSS.
- **Static Website on Amazon S3**: Deployment of web assets on AWS S3 for hosting.
- **HTTPS Security**: Secured access through HTTPS, implemented using Amazon CloudFront.
- **Custom Domain via Route 53**: Utilized Amazon Route 53 for domain management (`jmerhi.com`).
- **Dynamic Visitor Counter**: JavaScript-based visitor counting mechanism.
- **Database Integration**: Used Amazon DynamoDB for storing and managing visitor data.
- **API Implementation**: Created an API using AWS Lambda and API Gateway for backend communication.
- **Infrastructure as Code**: Managed AWS resources using AWS Serverless Application Model (SAM) and Terraform.
- **Version Control**: Code maintained and version-controlled using GitHub.
- **CI/CD Pipeline**: Automated deployment and updates using GitHub Actions.

## Infrastructure and Services

### AWS Services Utilized

- **Amazon S3**: Hosts website files (`index.html`, `style.css`, `script.js`, `showcv.html`).
- **Amazon CloudFront**: Provides DNS resolution and content caching.
- **AWS Certificate Manager**: Manages SSL/TLS for HTTPS.
- **Amazon Route 53**: Handles domain registration and DNS management.
- **Amazon DynamoDB**: Hosts `visitorcount` table with partition key `id`.
- **AWS Lambda**: Powers `updateVisitorCount` function.
- **Amazon API Gateway**: Manages `VisitorCountAPI` with `/count` route.
#
### Technical Configuration

### CI/CD Pipeline Using GitHub Actions

- **Overview**:
  - Automates the deployment of website content to an Amazon S3 bucket upon code changes pushed to the GitHub repository.

- **Workflow File**:
  - `deploy.yml`: Located in `.github/workflows`, this file defines the steps executed by GitHub Actions.

- **Key Components**:
  - **Checkout Action**: Checks out the code from the repository.
  - **Build Step**: Optional step for building the project (e.g., compiling SCSS to CSS, building a React app).
  - **S3 Sync Action**: Utilizes `jakejarvis/s3-sync-action@master` to synchronize the project files with the specified S3 bucket. jakejarvis's s3-sync-action... is a marketplace action you can use to sync S3 buckets. 

- **Configuration Details**:
  - **Trigger**: Configured to run on push events to the `main` branch (can be adjusted to other branches as needed).
  - **AWS Credentials**: Uses AWS Access Key ID and Secret Access Key stored in GitHub Secrets for secure AWS operations.
  - **S3 Bucket Configuration**: Specifies the target S3 bucket and region.

- **Deployment Steps**:
  1. **Push Changes**: Developers push changes to the designated branch on GitHub.
  2. **Run Workflow**: The `deploy.yml` workflow is automatically triggered.
  3. **Build and Deploy**: The workflow checks out the latest code, optionally builds it, and then syncs it with the S3 bucket.



### DynamoDB Table
```json
{
  "id": { "S": "mainPage" },
  "count": { "N": "0" }
}
```
#
### Lambda Function Configuration

### Lambda Function Configuration in Python
- **Function Name**: `updateVisitorCount`
- **Runtime**: Python
- **Functionality**:
  - Uses Boto3 to interact with the DynamoDB `visitorcount` table.
  - Retrieves and updates the visitor count, implementing cooldown logic to prevent rapid successive updates.
  - Deployed with the required dependencies and IAM role with permissions for DynamoDB access.
- **Key Steps**:
  1. Developed the function using Python with Boto3 for AWS SDK interaction.
  2. Included error handling and response formatting in line with API Gateway requirements.
  3. Packaged and deployed the function to AWS Lambda.
  4. Tested the function's integration with DynamoDB and API Gateway.
#
### API Gateway Configuration

- **API Name**: `VisitorCountAPI`
- **Type**: HTTP API
- **Route**:
  - `/count`: Handles GET requests to interact with the Lambda function.
- **Integration**:
  - Connected to the `updateVisitorCount` Lambda function.
- **Deployment**:
  - Deployed to the `prod` stage.
- **Security**:
  - Cooldown mechanism implemented to limit the rate of incoming requests.
  - Can be further secured using API keys or IAM authorizers, depending on requirements.

## Infrastructure as Code Implementation

### Using AWS SAM
- **Key Steps**:
  1. Initialized an AWS SAM project using `sam init`.
  2. Defined serverless resources like Lambda functions and API Gateway in the `template.yaml`.
  3. Built the SAM application using `sam build`.
  4. Deployed the application to AWS using `sam deploy --guided`.

### Using Terraform
- **Terraform Files**:
  - `main.tf`: Defines AWS resources like DynamoDB table, Lambda function, and API Gateway.
  - `variables.tf`: Contains variable definitions used in `main.tf`.
  - `outputs.tf`: Defines output variables for easy access to resource information.
- **Deployment Steps**:
  1. Initialized the Terraform project using `terraform init`.
  2. Reviewed the planned infrastructure changes with `terraform plan`.
  3. Applied the configuration to create resources on AWS using `terraform apply`.