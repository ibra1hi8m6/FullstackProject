using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SOBHWMASA.Data.Migrations
{
    /// <inheritdoc />
    public partial class NewStatusInMTOM : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MealCategories");

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "MealSizes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "CategoryMealId",
                table: "Meals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "MealIngredients",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Meals_CategoryMealId",
                table: "Meals",
                column: "CategoryMealId");

            migrationBuilder.AddForeignKey(
                name: "FK_Meals_CategoryMeals_CategoryMealId",
                table: "Meals",
                column: "CategoryMealId",
                principalTable: "CategoryMeals",
                principalColumn: "CategoryMealId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Meals_CategoryMeals_CategoryMealId",
                table: "Meals");

            migrationBuilder.DropIndex(
                name: "IX_Meals_CategoryMealId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "MealSizes");

            migrationBuilder.DropColumn(
                name: "CategoryMealId",
                table: "Meals");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "MealIngredients");

            migrationBuilder.CreateTable(
                name: "MealCategories",
                columns: table => new
                {
                    MealCategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryMealId = table.Column<int>(type: "int", nullable: false),
                    MealId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MealCategories", x => x.MealCategoryId);
                    table.ForeignKey(
                        name: "FK_MealCategories_CategoryMeals_CategoryMealId",
                        column: x => x.CategoryMealId,
                        principalTable: "CategoryMeals",
                        principalColumn: "CategoryMealId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MealCategories_Meals_MealId",
                        column: x => x.MealId,
                        principalTable: "Meals",
                        principalColumn: "MealId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MealCategories_CategoryMealId",
                table: "MealCategories",
                column: "CategoryMealId");

            migrationBuilder.CreateIndex(
                name: "IX_MealCategories_MealId",
                table: "MealCategories",
                column: "MealId");
        }
    }
}
