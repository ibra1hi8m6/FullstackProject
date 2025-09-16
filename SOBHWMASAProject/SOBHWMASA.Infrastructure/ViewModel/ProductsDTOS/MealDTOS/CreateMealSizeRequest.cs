using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Infrastructure.ViewModel.ProductsDTOS.MealDTOS
{
    public class CreateMealSizeRequest
    {
        public int SizeId { get; set; }
        public decimal Price { get; set; }
    }
    public class CreateMealIngredientRequest
    {
        public int IngredientId { get; set; }
    }

    public class CreateMealRequest
    {
        public string NameEnglish { get; set; }
        public string NameArabic { get; set; }
        public bool Status { get; set; }
        public int CategoryMealId { get; set; }

        public List<CreateMealSizeRequest> MealSizes { get; set; }
        public List<CreateMealIngredientRequest> MealIngredients { get; set; }
        public string ImageFileBase64 { get; set; }
    }
}
