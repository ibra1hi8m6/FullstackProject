using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Domain.Entities.Orders
{
    public class Coupon
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Code { get; set; }

        public decimal DiscountPercentage { get; set; }
        public decimal? DiscountAmount { get; set; }

        public DateTime? ExpiryDate { get; set; }

        public bool IsActive { get; set; } = true;

        public int UsageLimit { get; set; } = 1;
        public int UsedCount { get; set; } = 0;
        
        public virtual ICollection<Order> Orders { get; set; }
    }
}
