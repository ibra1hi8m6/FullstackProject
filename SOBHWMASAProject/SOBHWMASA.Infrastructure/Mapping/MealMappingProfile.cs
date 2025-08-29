using AutoMapper;
using SOBHWMASA.Domain.Entities.Products;
using SOBHWMASA.Infrastructure.ViewModel.Products.Meal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Infrastructure.Mapping
{
    public class MealMappingProfile : Profile
    {
        public MealMappingProfile()
        {
            CreateMap<Meal, MealDTO>().ReverseMap();
            CreateMap<CategoryMeal, CategoryMealDTO>().ReverseMap();
            CreateMap<MealIngredient, MealIngredientDTO>().ReverseMap();
            CreateMap<MealSize, MealSizeDTO>().ReverseMap();
           
        }
    }
}
