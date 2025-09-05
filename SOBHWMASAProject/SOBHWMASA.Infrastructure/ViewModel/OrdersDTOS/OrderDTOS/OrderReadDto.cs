using SOBHWMASA.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Infrastructure.ViewModel.OrdersDTOS.OrderDTOS
{

    public class OrderReadDto
    {
        public int Id { get; set; }
        public string OrderNumber { get; set; }
        public decimal TotalPrice { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public OrderStatus Status { get; set; }
        public ReceiveType ReceiveType { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Description { get; set; }
    }
}
