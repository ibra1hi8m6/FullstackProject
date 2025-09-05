using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOBHWMASA.Infrastructure.ViewModel.OrdersDTOS.CouponDTOS;
using SOBHWMASA.Service.Implementation.IService.IOrder;

namespace SOBHWMASA.APIS.Controllers.Orders
{
    [Route("api/[controller]")]
    [ApiController]
    public class CouponController : ControllerBase
    {
        private readonly ICouponService _couponService;

        public CouponController(ICouponService couponService)
        {
            _couponService = couponService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateCoupon([FromBody] CouponCreateDto dto)
        {
            var coupon = await _couponService.CreateCouponAsync(dto);
            return Ok(coupon);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCoupons()
        {
            var coupons = await _couponService.GetAllCouponsAsync();
            return Ok(coupons);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCouponById(int id)
        {
            var coupon = await _couponService.GetCouponByIdAsync(id);
            if (coupon == null) return NotFound("Coupon not found");
            return Ok(coupon);
        }

        [HttpGet("validate/{code}")]
        public async Task<IActionResult> ValidateCoupon(string code)
        {
            var isValid = await _couponService.GetValidCouponAsync(code);
            return Ok(new { Code = code, IsValid = isValid });
        }

        // ✅ Update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCoupon(int id, [FromBody] CouponCreateDto dto)
        {
            try
            {
                await _couponService.UpdateCouponAsync(id, dto);
                return Ok("Coupon updated successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // ✅ Soft Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> SoftDeleteCoupon(int id)
        {
            try
            {
                await _couponService.SoftDeleteCouponAsync(id);
                return Ok("Coupon deleted successfully (soft delete)");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
