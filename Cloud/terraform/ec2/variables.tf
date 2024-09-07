
variable "vpc_id" {
  description = "VPC_ID"
  type = string
}

variable "public_subnets" {
  description = "퍼블릭 서브넷 주소"
  type = list(string)
}

variable "private_subnets" {
  description = "프라이빗 서브넷 주소"
  type = list(string)
}

variable "db_subnets" {
  description = "DB 서브넷 주소"
  type = list(string)
}