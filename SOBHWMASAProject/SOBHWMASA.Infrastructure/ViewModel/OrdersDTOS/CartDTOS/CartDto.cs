using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Infrastructure.ViewModel.OrdersDTOS.CartDTOS
{
    public class CartDto
    {
        public int CartId { get; set; }
        public bool Status { get; set; }
        public List<CartItemDto> CartItems { get; set; }
    }
}
