using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SOBHWMASA.Data;
using SOBHWMASA.Domain.Entities.Orders;
using SOBHWMASA.Infrastructure.ViewModel.OrdersDTOS.CartDTOS;
using SOBHWMASA.Service.Implementation.IService.IOrder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Service.Implementation.Service.Orders
{
    public class CartService : ICartService
    {
        private readonly IRepository<Cart> _cartRepo;
        private readonly IRepository<CartItem> _cartItemRepo;
        
        private readonly IMapper _mapper;

        public CartService(
            IRepository<Cart> cartRepo,
            IRepository<CartItem> cartItemRepo,
           
            IMapper mapper)
        {
            _cartRepo = cartRepo;
            _cartItemRepo = cartItemRepo;
          
            _mapper = mapper;
        }

        public async Task<CartDto> CreateCartAsync(CartDto cartDto, string userId)
        {
            // 1. Check for an existing active cart
            var activeCart = (await _cartRepo.GetAllAsync(
    c => c.UserId == userId && c.Status == true,
    include: q => q.Include(c => c.CartItems)
)).FirstOrDefault();

            bool isNewCart = false;
            if (activeCart == null)
            {
                // Create a new cart if none exists or status is false
                activeCart = new Cart
                {
                    UserId = userId,
                    Status = true,
                    CartItems = new List<CartItem>()
                };
                await _cartRepo.AddAsync(activeCart);
                await _cartRepo.SaveAsync();
                isNewCart = true;
            }

            // 2 & 3. Add items to the existing (or new) cart
            foreach (var itemDto in cartDto.CartItems)
            {
                var existingItem = activeCart.CartItems.FirstOrDefault(
            i => i.MealId == itemDto.MealId && i.SizeId == itemDto.SizeId);

                if (existingItem != null)
                {
                    existingItem.Quantity += itemDto.Quantity;
                    _cartItemRepo.Update(existingItem);
                }
                else
                {
                    var cartItem = new CartItem
                    {
                        CartId = activeCart.CartId,
                        MealId = itemDto.MealId,
                        SizeId = itemDto.SizeId, // Add this
                        Quantity = itemDto.Quantity,
                        Status = true
                    };
                    await _cartItemRepo.AddAsync(cartItem);
                }
            }

            await _cartRepo.SaveAsync();

            return _mapper.Map<CartDto>(activeCart);
        }

        public async Task<CartDto?> GetActiveCartByUserAsync(string userId)
        {
            var activeCart = (await _cartRepo.GetAllAsync(
                c => c.UserId == userId && c.Status == true,
                include: q => q.Include(c => c.CartItems)
            )).FirstOrDefault();

            if (activeCart == null)
            {
                return null;
            }

            return _mapper.Map<CartDto>(activeCart);
        }
        public async Task<CartDto> GetCartByIdAsync(int cartId)
        {
            var cart = (await _cartRepo.GetAllAsync(
                c => c.CartId == cartId,
                include: q => q.Include(c => c.CartItems)
            )).FirstOrDefault();

            if (cart == null) return null;

            return _mapper.Map<CartDto>(cart);
        }

        // 4. New function to delete a specific item
        public async Task DeleteItemFromCartAsync(int cartId, int cartItemId)
        {
            var cart = await _cartRepo.GetByIdAsync(cartId);
            if (cart == null)
            {
                throw new KeyNotFoundException("Cart not found.");
            }

            var cartItem = await _cartItemRepo.GetByIdAsync(cartItemId);
            if (cartItem == null)
            {
                throw new KeyNotFoundException("Cart item not found.");
            }

            // Check if the item belongs to the specified cart
            if (cartItem.CartId != cartId)
            {
                throw new InvalidOperationException("The cart item does not belong to the specified cart.");
            }

            // Perform the deletion
            _cartItemRepo.Delete(cartItem);
            await _cartItemRepo.SaveAsync();
        }
        public async Task ClearCartAsync(int cartId)
        {
            var items = await _cartItemRepo.GetAllAsync(i => i.CartId == cartId);

            foreach (var item in items)
            {
                _cartItemRepo.Delete(item);
            }

            await _cartItemRepo.SaveAsync();
        }
    }
}

