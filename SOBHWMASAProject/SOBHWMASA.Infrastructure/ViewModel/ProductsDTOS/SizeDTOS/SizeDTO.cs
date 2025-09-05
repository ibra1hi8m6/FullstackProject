using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Infrastructure.ViewModel.Products.Size
{
    public class SizeDTO
    {
        public int SizeId { get; set; }
        public string NameEnglish { get; set; }
        public string NameArabic { get; set; }
        
        public bool Status { get; set; }

        public int CategorySizeId { get; set; }
    }
}
