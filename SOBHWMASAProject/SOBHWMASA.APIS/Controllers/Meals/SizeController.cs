using Microsoft.AspNetCore.Mvc;
using SOBHWMASA.Infrastructure.ViewModel.Products.Size;
using System.Collections.Generic;
using System.Threading.Tasks;
using SOBHWMASA.Infrastructure.ViewModel.Products.Meal;
using SOBHWMASA.Service.Implementation.IService.IProduct;

namespace SOBHWMASA.APIS.Controllers.Meals
{
    [Route("api/[controller]")]
    [ApiController]
    public class SizeController : ControllerBase
    {
        private readonly ISizeService _sizeService;

        public SizeController(ISizeService sizeService)
        {
            _sizeService = sizeService;
        }

        // CategorySize Endpoints
        [HttpPost("AddCategorySize")]
        public async Task<IActionResult> AddCategorySize([FromBody] CategorySizeDTO categorySizeDTO)
        {
            await _sizeService.AddCategorySizeAsync(categorySizeDTO);
            return Ok("Category Size added successfully.");
        }

        [HttpGet("GetAllCategorySizes")]
        public async Task<ActionResult<IEnumerable<CategorySizeDTO>>> GetAllCategorySizes()
        {
            var result = await _sizeService.GetAllCategorySizesAsync();
            return Ok(result);
        }

        [HttpGet("GetCategorySizeById/{id}")]
        public async Task<ActionResult<CategorySizeDTO>> GetCategorySizeById(int id)
        {
            var result = await _sizeService.GetCategorySizeByIdAsync(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpDelete("DeleteCategorySizeById/{id}")]
        public async Task<IActionResult> SoftDeleteCategorySize(int id)
        {
            await _sizeService.SoftDeleteCategorySizeAsync(id);
            return Ok("Category Size deleted successfully.");
        }

        [HttpPut("UpdateCategorySize/{id}")]
        public async Task<ActionResult<CategorySizeDTO>> UpdateAndCopyCategorySize(int id, [FromBody] CategorySizeDTO updatedDto)
        {
            var result = await _sizeService.UpdateAndCopyCategorySizeAsync(id, updatedDto);
            return Ok(result);
        }

        // Size Endpoints
        [HttpPost("AddSize")]
        public async Task<IActionResult> AddSize([FromBody] SizeDTO sizeDTO)
        {
            await _sizeService.AddSizeAsync(sizeDTO);
            return Ok("Size added successfully.");
        }

        [HttpGet("GetAllSizes")]
        public async Task<ActionResult<IEnumerable<SizeDTO>>> GetAllSizes()
        {
            var result = await _sizeService.GetAllSizesAsync();
            return Ok(result);
        }

        [HttpGet("GetSizeById/{id}")]
        public async Task<ActionResult<SizeDTO>> GetSizeById(int id)
        {
            var result = await _sizeService.GetSizeByIdAsync(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpGet("GetSizesByCategoryId/{categoryId}")]
        public async Task<ActionResult<IEnumerable<SizeDTO>>> GetSizesByCategoryId(int categoryId)
        {
            var result = await _sizeService.GetSizesByCategoryIdAsync(categoryId);
            return Ok(result);
        }

        [HttpDelete("DeleteSizeById/{id}")]
        public async Task<IActionResult> SoftDeleteSize(int id)
        {
            await _sizeService.SoftDeleteSizeAsync(id);
            return Ok("Size deleted successfully.");
        }

        [HttpPut("UpdateSizeById/{id}")]
        public async Task<ActionResult<SizeDTO>> UpdateAndCopySize(int id, [FromBody] SizeDTO updatedDto)
        {
            var result = await _sizeService.UpdateAndCopySizeAsync(id, updatedDto);
            return Ok(result);
        }
    }
}