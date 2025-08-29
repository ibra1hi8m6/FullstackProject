using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Infrastructure.ViewModel.Orders
{
    public class CartDto
    {
        
        public bool Status { get; set; }
        public List<CartItemDto> CartItems { get; set; }
    }
}
