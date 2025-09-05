using AutoMapper;
using SOBHWMASA.Data;
using SOBHWMASA.Domain.Entities.Orders;
using SOBHWMASA.Infrastructure.ViewModel.OrdersDTOS.CouponDTOS;
using SOBHWMASA.Service.Implementation.IService.IOrder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Service.Implementation.Service.Orders
{
    public class CouponService : ICouponService
    {
        private readonly IRepository<Coupon> _couponRepo;
        private readonly IMapper _mapper;

        public CouponService(IRepository<Coupon> couponRepo, IMapper mapper)
        {
            _couponRepo = couponRepo;
            _mapper = mapper;
        }

        public async Task<CouponReadDto> CreateCouponAsync(CouponCreateDto dto)
        {
            var coupon = _mapper.Map<Coupon>(dto);
            coupon.IsActive = true;

            await _couponRepo.AddAsync(coupon);
            await _couponRepo.SaveAsync();

            return _mapper.Map<CouponReadDto>(coupon);
        }

        public async Task<IEnumerable<CouponReadDto>> GetAllCouponsAsync()
        {
            var coupons = await _couponRepo.GetAllAsync();
            return _mapper.Map<IEnumerable<CouponReadDto>>(coupons);
        }

        public async Task<CouponReadDto> GetCouponByIdAsync(int id)
        {
            var coupon = await _couponRepo.GetByIdAsync(id);
            return _mapper.Map<CouponReadDto>(coupon);
        }

        public async Task<Coupon?> GetValidCouponAsync(string code)
        {
            var coupon = (await _couponRepo.GetAllAsync(c => c.Code == code && c.IsActive))
                .FirstOrDefault();

            if (coupon == null) return null;

            if (coupon.ExpiryDate.HasValue && coupon.ExpiryDate.Value < DateTime.UtcNow)
                return null;

            if (coupon.UsedCount >= coupon.UsageLimit)
                return null;

            return coupon;
        }

        public async Task UseCouponAsync(int id)
        {
            var coupon = await _couponRepo.GetByIdAsync(id);
            if (coupon == null) throw new Exception("Coupon not found");

            if (coupon.UsedCount >= coupon.UsageLimit)
                throw new Exception("Coupon usage limit reached");

            coupon.UsedCount++;
            if (coupon.UsedCount >= coupon.UsageLimit) coupon.IsActive = false;

            _couponRepo.Update(coupon);
            await _couponRepo.SaveAsync();
        }
        public async Task UpdateCouponAsync(int id, CouponCreateDto dto)
        {
            var coupon = await _couponRepo.GetByIdAsync(id);
            if (coupon == null || !coupon.IsActive)
                throw new Exception("Coupon not found or inactive");

            coupon.Code = dto.Code;
            coupon.DiscountPercentage = dto.DiscountPercentage;
            coupon.DiscountAmount = dto.DiscountAmount;
            coupon.UsageLimit = dto.UsageLimit;
            coupon.ExpiryDate = dto.ExpiryDate;

            _couponRepo.Update(coupon);
            await _couponRepo.SaveAsync();
        }

        public async Task SoftDeleteCouponAsync(int id)
        {
            var coupon = await _couponRepo.GetByIdAsync(id);
            if (coupon == null)
                throw new Exception("Coupon not found");

            coupon.IsActive = false; // mark inactive
            _couponRepo.Update(coupon);
            await _couponRepo.SaveAsync();
        }
    }
}
