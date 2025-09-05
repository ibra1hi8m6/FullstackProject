using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOBHWMASA.Infrastructure.ViewModel.Products.Meal;
using SOBHWMASA.Service.Implementation.Service;
using System.Text.Json;
using SOBHWMASA.Service.Implementation.IService.IProduct;
namespace SOBHWMASA.APIS.Controllers.Meals
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealController : ControllerBase
    {
        private readonly IMealService _mealService;

        public MealController(IMealService mealService)
        {
            _mealService = mealService;
        }

        // 1. Add Category Meal
        [HttpPost("AddCategoryMeal")]
        public async Task<IActionResult> AddCategoryMeal([FromBody] CategoryMealDTO categoryMealDTO)
        {
            if (categoryMealDTO == null) return BadRequest("Invalid data.");
            await _mealService.AddCategoryMealAsync(categoryMealDTO);
            return Ok(new { Message = "Category Meal Added Successfully" });
        }

        // 2. Add Meal
        [HttpPost("AddMeal")]
        public async Task<IActionResult> AddMeal([FromBody] MealDTO mealDto)
        {
            if (!ModelState.IsValid) // <--- Inspect ModelState here if you hit this
            {
                return BadRequest(ModelState); // This is what returns the detailed errors object
            }
            try
            {
               
                await _mealService.AddMealAsync(mealDto);
                return Ok("Meal created successfully");
            }
            catch (Exception ex)
            {
                
                return BadRequest(ex.Message);
            }
        }

        // 3. Get All Category Meals
        [HttpGet("GetAllCategoriesMeals")]
        public async Task<ActionResult<IEnumerable<CategoryMealDTO>>> GetAllCategoryMeals()
        {
            var result = await _mealService.GetAllCategoryMealsAsync();
            return Ok(result);
        }

        // 4. Get All Meals
        [HttpGet("GetAllMeals")]
        public async Task<ActionResult<IEnumerable<MealDTO>>> GetAllMeals()
        {
            var result = await _mealService.GetAllMealsAsync();
            return Ok(result);
        }

        // 5. Get Meal by ID
        [HttpGet("GetMealByID/{id}")]
        public async Task<ActionResult<MealDTO>> GetMealById(int id)
        {
            var meal = await _mealService.GetMealByIdAsync(id);
            if (meal == null) return NotFound("Meal not found.");
            return Ok(meal);
        }

        [HttpGet("GetCategoryMealByID/{id}")]
        public async Task<ActionResult<CategoryMealDTO>> GetCategoryMealById(int id)
        {
            var categoryMeal = await _mealService.GetCategoryMealByIdAsync(id);
            if (categoryMeal == null) return NotFound("Category Meal not found.");
            return Ok(categoryMeal);
        }

        // 6. Update and Copy Meal
        [HttpPut("UpdateMealByID/{id}")]
        public async Task<IActionResult> UpdateAndCopyMeal(int id, [FromBody] MealDTO updatedDto)
        {
            var updatedMeal = await _mealService.UpdateAndCopyMealAsync(id, updatedDto);
            if (updatedMeal == null) return NotFound("Meal not found.");
            return Ok(updatedMeal);
        }

        [HttpPut("UpdateCategoryMealByID/{id}")]
        public async Task<IActionResult> UpdateAndCopyCategoryMeal(int id, [FromBody] CategoryMealDTO updatedDto)
        {
            var updatedCategoryMeal = await _mealService.UpdateAndCopyCategoryMealAsync(id, updatedDto);
            if (updatedCategoryMeal == null) return NotFound("Category Meal not found.");
            return Ok(updatedCategoryMeal);
        }

        // 7. Soft Delete Meal
        [HttpDelete("DeleteMealByID/{id}")]
        public async Task<IActionResult> SoftDeleteMeal(int id)
        {
            await _mealService.SoftDeleteMealAsync(id);
            return Ok(new { Message = "Meal Soft Deleted Successfully" });
        }

        [HttpDelete("DeleteCategoryMealByID/{id}")]
        public async Task<IActionResult> SoftDeleteCategoryMeal(int id)
        {
            await _mealService.SoftDeleteCategoryMealAsync(id);
            return Ok(new { Message = "Category Meal Soft Deleted Successfully" });
        }

        // 8. Get Meals by Category ID
        [HttpGet("GetMealsByCategoryID/{categoryId}")]
        public async Task<ActionResult<IEnumerable<MealDTO>>> GetMealsByCategoryId(int categoryId)
        {
            var result = await _mealService.GetMealsByCategoryIdAsync(categoryId);
            return Ok(result);
        }
    }
}
