using SOBHWMASA.Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Domain.Entities.Orders
{
    public class Cart
    {
        public int CartId { get; set; }
        public bool Status { get; set; }= true;
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public ICollection<CartItem> CartItems { get; set; }
    }
}
