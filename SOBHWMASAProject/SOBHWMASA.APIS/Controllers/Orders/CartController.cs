using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SOBHWMASA.Infrastructure.ViewModel.Orders;
using SOBHWMASA.Service.Implementation.IService;
using System.Security.Claims;

namespace SOBHWMASA.APIS.Controllers.Orders
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateCart([FromBody] CartDto cartDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User ID not found in token.");

            // Now, pass the server-validated user ID to your service
            var cart = await _cartService.CreateCartAsync(cartDto, userId);
            return Ok(cart);
        }
        

        [HttpGet("user/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetCartsByUser(string userId)
        {
            var carts = await _cartService.GetCartsByUserAsync(userId);
            return Ok(carts);
        }

        [HttpGet("{cartId}")]
        [Authorize]
        public async Task<IActionResult> GetCartById(int cartId)
        {
            var cart = await _cartService.GetCartByIdAsync(cartId);
            if (cart == null) return NotFound();
            return Ok(cart);
        }
    }
}
