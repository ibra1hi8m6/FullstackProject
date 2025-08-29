using SOBHWMASA.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Domain.Entities.Products
{
    public class Ingredient
    {
        public int IngredientId { get; set; }
        public string NameEnglish { get; set; }
        public string NameArabic { get; set; }
        public bool Status { get; set; }

        public int CategoryIngredientId { get; set; }
        public CategoryIngredient CategoryIngredient { get; set; }

    }
}
