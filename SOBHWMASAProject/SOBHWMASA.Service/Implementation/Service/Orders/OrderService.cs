using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SOBHWMASA.Data;
using SOBHWMASA.Domain.Entities.Orders;
using SOBHWMASA.Domain.Enum;
using SOBHWMASA.Infrastructure.ViewModel.OrdersDTOS.OrderDTOS;
using SOBHWMASA.Service.Implementation.IService.IOrder;

namespace SOBHWMASA.Service.Implementation.Service.Orders
{
    public class OrderService : IOrderService
    {
        private readonly IRepository<Order> _orderRepo;
        private readonly IRepository<Cart> _cartRepo;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public OrderService(
            IRepository<Order> orderRepo,
            IRepository<Cart> cartRepo,
            ApplicationDbContext context,
            IMapper mapper)
        {
            _orderRepo = orderRepo;
            _cartRepo = cartRepo;
            _context = context;
            _mapper = mapper;
        }

        public async Task<OrderReadDto> CreateOrderAsync(OrderCreateDto dto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var order = _mapper.Map<Order>(dto);
                if (dto.CouponId.HasValue)
                {
                    var coupon = await _context.Coupons.FindAsync(dto.CouponId.Value);
                    if (coupon == null || !coupon.IsActive)
                        throw new Exception("Invalid coupon");

                    if (coupon.ExpiryDate.HasValue && coupon.ExpiryDate.Value < DateTime.UtcNow)
                        throw new Exception("Coupon expired");

                    if (coupon.UsedCount >= coupon.UsageLimit)
                        throw new Exception("Coupon usage limit reached");

                    // Example: assume coupon gives percentage discount
                    var discountAmount = order.SubTotal * (coupon.DiscountPercentage / 100m);
                    order.DiscountAmount = discountAmount;
                    order.TotalPrice = order.SubTotal - discountAmount;

                    // Mark coupon usage
                    coupon.UsedCount++;
                    if (coupon.UsedCount >= coupon.UsageLimit)
                        coupon.IsActive = false;

                    _context.Coupons.Update(coupon);
                }
                else
                {
                    order.TotalPrice = order.SubTotal;
                }
                

                // ✅ Ensure counter for today exists
                var today = DateTime.UtcNow.Date;
                var counter = await _context.OrderCounters
                    .FirstOrDefaultAsync(c => c.Date == today);

                if (counter == null)
                {
                    counter = new OrderCounter
                    {
                        Date = today,
                        Counter = 1
                    };
                    _context.OrderCounters.Add(counter);
                }
                else
                {
                    counter.Counter++;
                }

                await _context.SaveChangesAsync();

                // ✅ Assign Order Number
                order.OrderNumber = $"{today:yyyyMMdd}-{counter.Counter:D4}";
                order.Status = OrderStatus.Pending;
                order.CreatedAt = DateTime.UtcNow;

                await _orderRepo.AddAsync(order);
                await _orderRepo.SaveAsync();
                var activeCart = (await _cartRepo.GetAllAsync(
            c => c.UserId == dto.UserId && c.Status == true
        )).FirstOrDefault();

                if (activeCart != null)
                {
                    activeCart.Status = false;
                    _cartRepo.Update(activeCart);
                    await _cartRepo.SaveAsync();
                }

                await transaction.CommitAsync();

                return _mapper.Map<OrderReadDto>(order);
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        //private async Task<string> GenerateOrderNumberAsync()
        //{
        //    string today = DateTime.UtcNow.ToString("yyyyMMdd");
        //    int countToday = (await _orderRepo.GetAllAsync(o => o.CreatedAt.Date == DateTime.UtcNow.Date)).Count();
        //    return $"{today}-{(countToday + 1):D4}";
        //}

        public async Task<OrderReadDto> GetOrderByIdAsync(int id)
        {
            var order = await _orderRepo.GetByIdAsync(id);
            return _mapper.Map<OrderReadDto>(order);
        }

        public async Task<IEnumerable<OrderReadDto>> GetOrdersByUserIdAsync(string userId)
        {
            var orders = await _orderRepo.GetAllAsync(o => o.UserId == userId);
            return _mapper.Map<IEnumerable<OrderReadDto>>(orders);
        }

        public async Task UpdateOrderStatusAsync(int id, OrderStatus status)
        {
            var order = await _orderRepo.GetByIdAsync(id);
            if (order == null) throw new Exception("Order not found");
            order.Status = status;
            _orderRepo.Update(order);
            await _orderRepo.SaveAsync();
        }

        public async Task DeleteOrderAsync(int id)
        {
            var order = await _orderRepo.GetByIdAsync(id);
            if (order == null) throw new Exception("Order not found");
            _orderRepo.Delete(order);
            await _orderRepo.SaveAsync();
        }
    }
}
