using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Domain.Entities.Products
{
    public class MealSize
    {
        public int MealSizeId { get; set; }
        public int MealId { get; set; }
        public Meal Meal { get; set; }

        public int SizeId { get; set; }
        public Size Size { get; set; }

        public decimal Price { get; set; }
        public bool Status { get; set; }
    }
}
