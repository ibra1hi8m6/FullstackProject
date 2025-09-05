using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Infrastructure.ViewModel.OrdersDTOS.CouponDTOS
{
    public class CouponReadDto
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public decimal DiscountPercentage { get; set; }   // ✅ keep the same naming
        public int UsageLimit { get; set; }
        public int UsedCount { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public bool IsActive { get; set; }
    }
}
