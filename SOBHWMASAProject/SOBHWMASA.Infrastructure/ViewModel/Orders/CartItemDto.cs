using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Infrastructure.ViewModel.Orders
{
    public class CartItemDto
    {
        public int MealId { get; set; }
        public int Quantity { get; set; }
        public int SizeId { get; set; }
        public bool Status { get; set; }
    }
}
