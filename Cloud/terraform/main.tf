####기본적인 terraform setup을 위한 tf 파일
# S3 버켓과 DynamoDB를 생성한다

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  backend "s3" {
    bucket         = "ktb-qmaker-tfstate-bucket" #버킷이름
    key            = "terraform.tfstate"
    region         = "ap-northeast-2"
    dynamodb_table = "ktb-qmaker-tfstate-lock" #DB이름
    encrypt        = true
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.aws_region
}


# Front
resource "aws_s3_bucket" "qmaker_website" {
  bucket = "ktb-qmaker-bucket"
}

# S3 버킷의 공용 접근 차단 설정
resource "aws_s3_bucket_public_access_block" "qmaker_website_public_access_block" {
  bucket = aws_s3_bucket.qmaker_website.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_cloudfront_origin_access_control" "s3_oac" {
  name                              = "ktb-qmaker-oac"
  description                       = "OAC for ktb-qmaker S3 bucket"
  origin_access_control_origin_type = "s3"

  signing_behavior = "always"
  signing_protocol = "sigv4"
}

resource "aws_cloudfront_distribution" "qmaker_website_distribution" {
  origin {
    domain_name              = aws_s3_bucket.qmaker_website.bucket_regional_domain_name
    origin_id                = aws_s3_bucket.qmaker_website.id
    origin_access_control_id = aws_cloudfront_origin_access_control.s3_oac.id

  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.qmaker_website.id

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Name = "Qmaker Website Distribution"
  }
}

resource "aws_s3_bucket_policy" "qmaker_website_policy" {
  bucket = aws_s3_bucket.qmaker_website.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.qmaker_website.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.qmaker_website_distribution.arn
          }
        }
      }
    ]
  })
}


#VPC
module "vpc" {
  source = "./vpc"
}

#EC2
module "EC2" {
  source          = "./ec2"
  vpc_id          = module.vpc.vpc_id
  private_subnets = module.vpc.private_subnets
  public_subnets  = module.vpc.public_subnets
  db_subnets      = module.vpc.db_subnets
}