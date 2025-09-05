using SOBHWMASA.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Infrastructure.ViewModel.OrdersDTOS.OrderDTOS
{
    public class OrderCreateDto
    {
        public string? UserId { get; set; }
        public string? CreatedBy { get; set; }
        public decimal SubTotal { get; set; }
        public decimal? DiscountAmount { get; set; }
        public decimal TotalPrice { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public int? AddressId { get; set; }
        public int? CouponId { get; set; }
        public ReceiveType ReceiveType { get; set; }
        public string? Description { get; set; }
    }
}
