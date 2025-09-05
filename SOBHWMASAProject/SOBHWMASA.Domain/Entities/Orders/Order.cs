using SOBHWMASA.Domain.Entities.Users;
using SOBHWMASA.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Domain.Entities.Orders
{
    public class Order
    {
        public int Id { get; set; }

        // Who owns the order
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }

        // Optional: if the order was placed by cashier/admin
        public string CreatedBy { get; set; }

        // For tracking and invoices
        public string OrderNumber { get; set; }

        // Pricing
        public decimal SubTotal { get; set; }
        public decimal DiscountAmount { get; set; } = 0;
        public decimal TotalPrice { get; set; }

        // Payment
        public PaymentMethod PaymentMethod { get; set; }

        // Delivery (optional)
        public int? AddressId { get; set; }
        public virtual Address Address { get; set; }

        //  New: Receive Type
        public ReceiveType ReceiveType { get; set; }

        public string? Description { get; set; }

        // Stages
        public OrderStatus Status { get; set; } = OrderStatus.Pending;

        // Coupon system
        public int? CouponId { get; set; }
        public virtual Coupon Coupon { get; set; }

        // Tracking
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public string? UpdatedBy { get; set; }
    }

}
