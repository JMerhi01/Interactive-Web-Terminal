
# Interactive Web-Terminal Project

## Introduction

Welcome to my Interactive Terminal Website project! This project was an exciting journey where I combined my web development skills with cloud architecture, focusing on AWS services. The core idea was to create an interactive, dynamic resume as a terminal-style website, backed by a robust backend and a CI/CD pipeline.

## Project Description

In this project, I built an interactive resume website using HTML and CSS, hosted on Amazon S3. The site features a visitor counter implemented with JavaScript and interacts with a backend database. I utilized various AWS services to develop a comprehensive understanding of cloud-based web hosting and dynamic content management.

## Key Features

- **HTML Resume**: I coded my resume in HTML, displaying it on the web.
- **CSS Styling**: I applied basic CSS to make the website visually appealing.
- **Static Website on AWS S3**: I deployed my HTML resume as a static website on Amazon S3.
- **HTTPS Security**: I secured the website using HTTPS with Amazon CloudFront.
- **Custom DNS**: I set up a custom domain for my website, using Amazon Route 53.
- **Visitor Counter**: I implemented a visitor counter on my website using JavaScript.
- **Database Integration with DynamoDB**: I used Amazon DynamoDB to manage visitor count data.
- **API via AWS Gateway and Lambda**: I created an API for database communication, utilizing AWS API Gateway and Lambda.
- **Python Backend**: My Lambda functions were written in Python, employing the boto3 library.
- **Automated Testing**: I included tests for my Python code to ensure its functionality.
- **Infrastructure as Code (IaC)**: I managed AWS resources using AWS Serverless Application Model (SAM) and explored Terraform.
- **Source Control with GitHub**: I used GitHub for versioning both frontend and backend code.
- **CI/CD with GitHub Actions**: I set up CI/CD pipelines for automatic updates and deployments.


#
### Let's Get Started

### Interactive Web Terminal
- index.html
- style.css
- script.js

### HTML Resume
- showcv.html

### Static Website
- **Route 53** to register a domain and manage DNS (jmerhi.com)

- **S3 bucket** to store the files (index.html, script.js, showcv.html. style.css) 

- **S3 bucket permissions** blocking ALL public access but with a policy to enable CloudFront access. 

- **Static website** hosting enabled and endpoint configured with cloudfront 

- **Cloudfront** for DNS resolution and caching content for secure and fast access. 

- **Certificate Manager** to provision and manage a SSL/TLS certificate so I can enable HTTPS.