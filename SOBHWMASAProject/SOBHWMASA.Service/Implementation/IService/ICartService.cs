using SOBHWMASA.Domain.Entities.Orders;
using SOBHWMASA.Infrastructure.ViewModel.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Service.Implementation.IService
{
    public interface ICartService
    {
        Task<CartDto> CreateCartAsync(CartDto cartDto, string userId);
        Task<IEnumerable<CartDto>> GetCartsByUserAsync(string userId);
        Task<CartDto> GetCartByIdAsync(int cartId);
        Task DeleteItemFromCartAsync(int cartId, int cartItemId);
    }
}
