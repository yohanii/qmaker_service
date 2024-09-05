output "vpc_id" {
  value = aws_vpc.main_vpc.id
}

output "private_subnets" {
  description = "Private 서브넷의 ID 리스트"
  value = [
    for subnet in aws_subnet.subnets : subnet.id if !subnet.map_public_ip_on_launch
  ]
}


output "public_subnets" {
  description = "Public 서브넷의 ID 리스트"
  value = [
    for subnet in aws_subnet.subnets : subnet.id if subnet.map_public_ip_on_launch
  ]
}