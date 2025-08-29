using SOBHWMASA.Domain.Entities.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Domain.Entities.Orders
{
    public class CartItem
    {
        public int CartItemId { get; set; }
        public int MealId { get; set; }
        public Meal Meal { get; set; }
        public int SizeId { get; set; }
        public Size Size { get; set; }
        public int Quantity { get; set; }
        public bool Status { get; set; } = true;

        // Foreign key for the one-to-many relationship
        public int CartId { get; set; }
        public Cart Cart { get; set; }
    }
}
