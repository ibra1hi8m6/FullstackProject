using SOBHWMASA.Domain.Entities.Orders;
using SOBHWMASA.Infrastructure.ViewModel.OrdersDTOS.CouponDTOS;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Service.Implementation.IService.IOrder
{
    public interface ICouponService
    {
        Task<CouponReadDto> CreateCouponAsync(CouponCreateDto dto);
        Task<IEnumerable<CouponReadDto>> GetAllCouponsAsync();
        Task<CouponReadDto> GetCouponByIdAsync(int id);
        Task<Coupon?> GetValidCouponAsync(string code);
        Task UseCouponAsync(int id);
        Task UpdateCouponAsync(int id, CouponCreateDto dto);
        Task SoftDeleteCouponAsync(int id);

    }
}
