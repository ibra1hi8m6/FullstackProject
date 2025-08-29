using SOBHWMASA.Domain.Enum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Domain.Entities.Products
{
    public class CategoryIngredient
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CategoryIngredientId { get; set; }
        public string NameEnglish { get; set; }
        public string NameArabic { get; set; }
        public bool Status { get; set; }


    }
}
