using AutoMapper;
using SOBHWMASA.Domain.Entities.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;
using CategoryIngredientDTO = SOBHWMASA.Infrastructure.ViewModel.Products.Ingredient.CategoryIngredientDTO;
using IngredientDTO = SOBHWMASA.Infrastructure.ViewModel.Products.Ingredient.IngredientDTO;
namespace SOBHWMASA.Infrastructure.Mapping
{
    public class IngredientMappingProfile : Profile
    {
        public IngredientMappingProfile()
        {
            CreateMap<CategoryIngredient, CategoryIngredientDTO>().ReverseMap();
            
            CreateMap<Ingredient, IngredientDTO>().ReverseMap();
          
        }
    }
}
