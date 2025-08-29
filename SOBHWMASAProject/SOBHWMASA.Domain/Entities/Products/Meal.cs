using SOBHWMASA.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Domain.Entities.Products
{
    public class Meal
    {
        public int MealId { get; set; }
        public string NameEnglish { get; set; }
        public string NameArabic { get; set; }
        public bool Status { get; set; }
        public string ImageUrl { get; set; }
        public int CategoryMealId { get; set; }
        public CategoryMeal CategoryMeal { get; set; }
    }
}
