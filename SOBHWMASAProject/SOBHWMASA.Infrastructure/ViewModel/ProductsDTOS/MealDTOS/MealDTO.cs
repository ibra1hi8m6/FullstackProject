using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Infrastructure.ViewModel.Products.Meal
{
    public class MealDTO
    {
        public int MealId { get; set; }
        public string NameEnglish { get; set; }
        public string NameArabic { get; set; }
        public bool Status { get; set; }

        public int CategoryMealId { get; set; }
        public List<MealSizeDTO> MealSizes { get; set; }
        public List<MealIngredientDTO> MealIngredients { get; set; }
        public string ImageFileBase64 { get; set; }
    }
    
}
