using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Infrastructure.ViewModel.OrdersDTOS.CouponDTOS
{
    public class CouponCreateDto
    {
        public string Code { get; set; }
        public decimal DiscountPercentage { get; set; }
        public decimal? DiscountAmount { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public int UsageLimit { get; set; } = 1;
    }
}
