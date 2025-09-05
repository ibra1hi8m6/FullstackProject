using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Infrastructure.ViewModel.Products.Meal
{
    public class MealSizeDTO
    {
        public int MealSizeId { get; set; }
        public int SizeId { get; set; }
        public string NameEnglish { get; set; }
        public string NameArabic { get; set; }
        public decimal Price { get; set; }
        public bool Status { get; set; }
    }
}
