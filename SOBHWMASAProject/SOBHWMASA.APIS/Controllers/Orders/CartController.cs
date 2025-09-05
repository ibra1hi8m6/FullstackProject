using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOBHWMASA.Infrastructure.ViewModel.OrdersDTOS.CartDTOS;
using SOBHWMASA.Service.Implementation.IService.IOrder;

namespace SOBHWMASA.APIS.Controllers.Orders
{
    [Authorize]
    [Route("api/Cart")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        // Create cart for a specific user (userId from URL)
        [HttpPost("Create/{userId}")]
        [Authorize] // anyone logged in can call, but userId must be in URL
        public async Task<IActionResult> CreateCart([FromBody] CartDto cartDto, string userId)
        {
            var cart = await _cartService.CreateCartAsync(cartDto, userId);
            return Ok(cart);
        }

        // Get active cart for a specific user
        [HttpGet("active/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetActiveCart(string userId)
        {
            var activeCart = await _cartService.GetActiveCartByUserAsync(userId);
            if (activeCart == null)
                return NotFound("Active cart not found for this user.");

            return Ok(activeCart);
        }

        [HttpGet("{cartId}")]
        [Authorize]
        public async Task<IActionResult> GetCartById(int cartId)
        {
            var cart = await _cartService.GetCartByIdAsync(cartId);
            if (cart == null) return NotFound();
            return Ok(cart);
        }
        [HttpDelete("{cartId}/item/{cartItemId}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> DeleteItemFromCart(int cartId, int cartItemId)
        {
            try
            {
                await _cartService.DeleteItemFromCartAsync(cartId, cartItemId);
                return Ok();
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpDelete("{cartId}/clear")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> ClearCart(int cartId)
        {
            await _cartService.ClearCartAsync(cartId);
            return Ok();
        }
    }
}
