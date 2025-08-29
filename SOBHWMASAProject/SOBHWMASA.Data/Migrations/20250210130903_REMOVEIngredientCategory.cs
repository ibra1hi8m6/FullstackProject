using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SOBHWMASA.Data.Migrations
{
    /// <inheritdoc />
    public partial class REMOVEIngredientCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "IngredientCategories");

            migrationBuilder.AddColumn<int>(
                name: "CategoryIngredientId",
                table: "Ingredients",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_CategoryIngredientId",
                table: "Ingredients",
                column: "CategoryIngredientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_CategoryIngredients_CategoryIngredientId",
                table: "Ingredients",
                column: "CategoryIngredientId",
                principalTable: "CategoryIngredients",
                principalColumn: "CategoryIngredientId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_CategoryIngredients_CategoryIngredientId",
                table: "Ingredients");

            migrationBuilder.DropIndex(
                name: "IX_Ingredients_CategoryIngredientId",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "CategoryIngredientId",
                table: "Ingredients");

            migrationBuilder.CreateTable(
                name: "IngredientCategories",
                columns: table => new
                {
                    IngredientCategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryIngredientId = table.Column<int>(type: "int", nullable: false),
                    IngredientId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IngredientCategories", x => x.IngredientCategoryId);
                    table.ForeignKey(
                        name: "FK_IngredientCategories_CategoryIngredients_CategoryIngredientId",
                        column: x => x.CategoryIngredientId,
                        principalTable: "CategoryIngredients",
                        principalColumn: "CategoryIngredientId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_IngredientCategories_Ingredients_IngredientId",
                        column: x => x.IngredientId,
                        principalTable: "Ingredients",
                        principalColumn: "IngredientId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_IngredientCategories_CategoryIngredientId",
                table: "IngredientCategories",
                column: "CategoryIngredientId");

            migrationBuilder.CreateIndex(
                name: "IX_IngredientCategories_IngredientId",
                table: "IngredientCategories",
                column: "IngredientId");
        }
    }
}
