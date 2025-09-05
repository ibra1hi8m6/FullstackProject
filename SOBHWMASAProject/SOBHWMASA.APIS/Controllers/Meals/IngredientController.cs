using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOBHWMASA.Infrastructure.ViewModel.Products.Ingredient;
using SOBHWMASA.Service.Implementation.IService.IProduct;

namespace SOBHWMASA.APIS.Controllers.Meals
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        private readonly IIngredient _ingredientService;

        public IngredientController(IIngredient ingredientService)
        {
            _ingredientService = ingredientService;
        }

       
        [HttpPost("AddCategoryIngredient")]
        public async Task<IActionResult> AddCategoryIngredient([FromBody] CategoryIngredientDTO categoryIngredientDTO)
        {
            if (categoryIngredientDTO == null) return BadRequest("Invalid data.");
            await _ingredientService.AddCategoryIngredientAsync(categoryIngredientDTO);
            return Ok(new { Message = "Category Ingredient Added Successfully" });
        }


        [HttpPost("AddIngredient")]
        public async Task<IActionResult> AddIngredient([FromBody] IngredientDTO ingredientDTO)
        {
            if (ingredientDTO == null) return BadRequest("Invalid data.");
            await _ingredientService.AddIngredientAsync(ingredientDTO);
            return Ok(new { Message = "Ingredient Added Successfully" });
        }

        [HttpGet("GetAllCategoriesIngredients")]
        public async Task<ActionResult<IEnumerable<CategoryIngredientDTO>>> GetAllCategoryIngredients()
        {
            var result = await _ingredientService.GetAllCategoryIngredientsAsync();
            return Ok(result);
        }
        [HttpGet("GetCategoryIngredientbyID/{id}")]
        public async Task<ActionResult<IngredientDTO>> GetCategoryIngredientById(int id)
        {
            var ingredient = await _ingredientService.GetCategoryIngredientsByIdAsync(id);
            if (ingredient == null) return NotFound("Category Ingredient not found.");
            return Ok(ingredient);
        }


       

        [HttpGet("GetAllIngredients")]
        public async Task<ActionResult<IEnumerable<IngredientDTO>>> GetAllIngredients()
        {
            var result = await _ingredientService.GetAllIngredientsAsync();
            return Ok(result);
        }

      
        [HttpGet("GetIngredientbyID/{id}")]
        public async Task<ActionResult<IngredientDTO>> GetIngredientById(int id)
        {
            var ingredient =await _ingredientService.GetIngredientsByIdAsync(id);
            if (ingredient == null) return NotFound("Ingredient not found.");
            return Ok(ingredient);
        }

      
        [HttpGet("GetIngredientsbyCategoryID/{categoryId}")]
        public async Task<ActionResult<IEnumerable<IngredientDTO>>> GetIngredientsByCategoryId(int categoryId)
        {
            var result = await _ingredientService.GetIngredientsByCategoryIdAsync(categoryId);
            return Ok(result);
        }

       

       
        [HttpPut("UpdateIngredientbyID/{id}")]
        public async Task<IActionResult> UpdateAndCopyIngredient(int id, IngredientDTO updatedDto)
        {
            var updatedIngredient = await _ingredientService.UpdateAndCopyIngredientAsync(id,  updatedDto);
            if (updatedIngredient == null) return NotFound("Ingredient not found.");
            return Ok(updatedIngredient);
        }
        [HttpPut("UpdateCategoryIngredientbyID/{id}")]
        public async Task<IActionResult> UpdateAndCopyCategoryIngredient(int id, CategoryIngredientDTO updatedDto)
        {
            var updatedIngredient = await _ingredientService.UpdateAndCopyCategoryIngredientAsync(id,  updatedDto);
            if (updatedIngredient == null) return NotFound("Ingredient not found.");
            return Ok(updatedIngredient);
        }

        // 7. Soft Delete Ingredient
        [HttpDelete("DeleteIngredientbyID/{id}")]
        public async Task<IActionResult> SoftDeleteIngredient(int id)
        {
            await _ingredientService.SoftDeleteIngredientAsync(id);
            return Ok(new { Message = "Ingredient Soft Deleted Successfully" });
        }
        [HttpDelete("DeleteCategoryIngredientbyID/{id}")]
        public async Task<IActionResult> SoftDeleteCategoryIngredient(int id)
        {
            await _ingredientService.SoftDeleteCategoryIngredientAsync(id);
            return Ok(new { Message = "CategoryIngredient Soft Deleted Successfully" });
        }

       
    }
}
