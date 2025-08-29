using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SOBHWMASA.Domain.Entities.Orders;
using SOBHWMASA.Domain.Entities.Products;
using SOBHWMASA.Domain.Entities.Users;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Size = SOBHWMASA.Domain.Entities.Products.Size;

namespace SOBHWMASA.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<CategoryMeal> CategoryMeals { get; set; }
        public DbSet<CategoryIngredient> CategoryIngredients { get; set; }
        public DbSet<CategorySize> CategorySizes { get; set; }
        public DbSet<Meal> Meals { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Size> Sizes { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
       

        // Bridge entities

        
        public DbSet<MealIngredient> MealIngredients { get; set; }
        public DbSet<MealSize> MealSizes { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder); // Ensure Identity configurations are applied

            //// Configure composite keys for bridge entities
            //modelBuilder.Entity<IngredientCategory>()
            //    .HasKey(ic => new { ic.IngredientId, ic.CategoryIngredientId });

            //modelBuilder.Entity<MealCategory>()
            //    .HasKey(mc => new { mc.MealId, mc.CategoryMealId });

            //modelBuilder.Entity<MealIngredient>()
            //    .HasKey(mi => new { mi.MealId, mi.IngredientId });

            //modelBuilder.Entity<MealSize>()
            //    .HasKey(ms => new { ms.MealId, ms.SizeId });
        }
    }
}
