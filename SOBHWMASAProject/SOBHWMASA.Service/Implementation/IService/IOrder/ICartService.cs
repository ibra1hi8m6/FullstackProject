using SOBHWMASA.Domain.Entities.Orders;
using SOBHWMASA.Infrastructure.ViewModel.OrdersDTOS.CartDTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Service.Implementation.IService.IOrder
{
    public interface ICartService
    {
        Task<CartDto> CreateCartAsync(CartDto cartDto, string userId);
        Task<CartDto?> GetActiveCartByUserAsync(string userId);
        Task<CartDto> GetCartByIdAsync(int cartId);
        Task DeleteItemFromCartAsync(int cartId, int cartItemId);
        Task ClearCartAsync(int cartId);
    }
}
