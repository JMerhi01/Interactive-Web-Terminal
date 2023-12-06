
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

#### DynamoDB Table
```json
{
  "id": { "S": "mainPage" },
  "count": { "N": "0" }
}
```
#
### Lambda Function Configuration

- **Function Name**: `updateVisitorCount`
- **Runtime**: Node.js
- **Functionality**:
  - Interacts with the DynamoDB table `visitorcount` to increment and retrieve the visitor count.
  - Handles cooldown logic to prevent rapid successive updates.
- **Code Packaging**:
  - Includes `index.js` and `node_modules` folder.
  - Zipped and uploaded to AWS Lambda.
- **IAM Role**:
  - Configured with necessary permissions for accessing DynamoDB.
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