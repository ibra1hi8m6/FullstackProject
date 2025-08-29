using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Domain.Entities.Products
{
    public class MealIngredient
    {
        public int MealIngredientId { get; set; }
        public int MealId { get; set; }
        public Meal Meal { get; set; }

        public int IngredientId { get; set; }
        public Ingredient Ingredient { get; set; }
        public bool Status { get; set; }
    }
}
