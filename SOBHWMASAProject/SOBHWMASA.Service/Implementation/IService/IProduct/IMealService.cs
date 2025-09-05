using SOBHWMASA.Infrastructure.ViewModel.Products.Meal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Service.Implementation.IService.IProduct
{
    public interface IMealService
    {
        // CategoryMeal Methods
        Task AddCategoryMealAsync(CategoryMealDTO categoryMealDTO);
        Task<IEnumerable<CategoryMealDTO>> GetAllCategoryMealsAsync();
        Task<IEnumerable<CategoryMealDTO>> GetCategoryMealByIdAsync(int id);
        Task SoftDeleteCategoryMealAsync(int id);
        Task<CategoryMealDTO> UpdateAndCopyCategoryMealAsync(int id, CategoryMealDTO NewCategoryMealData);

        // Meal Methods
        Task AddMealAsync(MealDTO mealDTO);
        Task<IEnumerable<MealDTO>> GetAllMealsAsync();
        Task<IEnumerable<MealDTO>> GetMealsByCategoryIdAsync(int categoryId);
        Task<MealDTO> GetMealByIdAsync(int id);
        Task SoftDeleteMealAsync(int id);
        Task<MealDTO> UpdateAndCopyMealAsync(int id, MealDTO NewMealData);
    }
}
