using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CategoryIngredientDTO = SOBHWMASA.Infrastructure.ViewModel.Products.Ingredient.CategoryIngredientDTO;
using IngredientDTO = SOBHWMASA.Infrastructure.ViewModel.Products.Ingredient.IngredientDTO;

namespace SOBHWMASA.Service.Implementation.IService
{
    public interface IIngredient
    {
        Task AddCategoryIngredientAsync(CategoryIngredientDTO categoryIngredientDTO);
        Task AddIngredientAsync(IngredientDTO ingredientDTO);

        Task<IEnumerable<CategoryIngredientDTO>> GetAllCategoryIngredientsAsync();
        Task<IEnumerable<IngredientDTO>> GetAllIngredientsAsync();
        Task<IEnumerable<IngredientDTO>> GetIngredientsByCategoryIdAsync(int categoryId);
        Task<IEnumerable<IngredientDTO>> GetIngredientsByIdAsync(int id);
        Task<CategoryIngredientDTO> GetCategoryIngredientsByIdAsync(int id);
        Task SoftDeleteIngredientAsync(int id);
        Task SoftDeleteCategoryIngredientAsync(int id);
        Task<CategoryIngredientDTO> UpdateAndCopyCategoryIngredientAsync(int id, CategoryIngredientDTO updatedDto);
        Task<IngredientDTO> UpdateAndCopyIngredientAsync(int id, IngredientDTO updatedDto);
    }
}
