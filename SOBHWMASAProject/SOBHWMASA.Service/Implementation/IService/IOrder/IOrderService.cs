using SOBHWMASA.Domain.Enum;
using SOBHWMASA.Infrastructure.ViewModel.OrdersDTOS.OrderDTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Service.Implementation.IService.IOrder
{
    public interface IOrderService
    {
        Task<OrderReadDto> CreateOrderAsync(OrderCreateDto dto);
        Task<OrderReadDto> GetOrderByIdAsync(int id);
        Task<IEnumerable<OrderReadDto>> GetOrdersByUserIdAsync(string userId);
        Task UpdateOrderStatusAsync(int id, OrderStatus status);
        Task DeleteOrderAsync(int id);
    }
}
