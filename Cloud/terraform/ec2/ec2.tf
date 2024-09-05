locals {
  common_tags = {
    Project     = "ktb-qmaker"
    Owner       = "Cloud-Team-Bryan"
    CreatedBy   = "Terraform"
    CreatedDate = formatdate("YYYY-MM-DD", timestamp())
  }
}# EC2 인스턴스를 위한 보안 그룹 생성
resource "aws_security_group" "backend_sg" {
  vpc_id = var.vpc_id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 9100
    to_port     = 9100
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.common_tags, {
    Name = "ktb-qmaker-backend-sg"
  })
}

resource "aws_security_group" "python_sg" {
  vpc_id = var.vpc_id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 9100
    to_port     = 9100
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.common_tags, {
    Name = "ktb-qmaker-python-sg"
  })
}

# Backend용 ALB 생성
resource "aws_lb" "backend_alb" {
  name               = "backend-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.backend_sg.id]
  subnets            = var.public_subnets

  tags = merge(local.common_tags, {
    Name = "ktb-qmaker-backend-alb"
  })
}

resource "aws_lb_target_group" "backend_tg" {
  name        = "backend-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
}

resource "aws_lb_listener" "backend_listener" {
  load_balancer_arn = aws_lb.backend_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend_tg.arn
  }
}

# Backend용 EC2 인스턴스 생성 (각 AZ에 하나씩)
resource "aws_instance" "backend_instances" {
  count         = 2
  ami           = "ami-0c2acfcb2ac4d02a0" # Amazon Linux 2 AMI (최신 확인 필요)
  instance_type = "t2.small"
  subnet_id     = element(var.private_subnets, count.index)
  security_groups = [aws_security_group.backend_sg.id]

  tags = merge(local.common_tags, {
    Name = "ktb-qmaker-backend-instance-${count.index}"
  })
}

# Backend 인스턴스를 Backend ALB Target Group에 연결
resource "aws_lb_target_group_attachment" "backend_tg_attachment" {
  count            = 2
  target_group_arn = aws_lb_target_group.backend_tg.arn
  target_id        = aws_instance.backend_instances[count.index].id
  port             = 8080
}


# Python용 EC2 인스턴스 생성 (각 AZ에 하나씩)
resource "aws_instance" "python_instances" {
  count         = 2
  ami           = "ami-0c2acfcb2ac4d02a0"  # Amazon Linux 2 AMI (최신 확인 필요)
  instance_type = "t3.small"
  subnet_id     = element(var.private_subnets, count.index)
  security_groups = [aws_security_group.python_sg.id]

  tags = merge(local.common_tags, {
    Name = "ktb-qmaker-python-instance-${count.index}"
  })
}

# Qmaker-Dev-Host 인스턴스 생성
resource "aws_instance" "qmaker_dev_host" {
  ami           = "ami-05d768df76a2b8bd8" # Amazon Linux 2 AMI (최신 확인 필요)
  instance_type = "t3.small"
  subnet_id     = var.public_subnets[0] # 퍼블릭 서브넷 중 하나에 배치
  security_groups = [aws_security_group.backend_sg.id]

  tags = merge(local.common_tags, {
    Name = "ktb-qmaker-dev-host"
  })
}