using Microsoft.EntityFrameworkCore.Migrations;

namespace MasterDataViagem.Migrations
{
    public partial class vehicleDuty : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VehicleDuties",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    key = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    color = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    depots = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleDuties", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorkBlocks",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    key = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    startTime = table.Column<int>(type: "int", nullable: false),
                    endTime = table.Column<int>(type: "int", nullable: false),
                    startNode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    endNode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    isCrewTravelTime = table.Column<bool>(type: "bit", nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false),
                    VehicleDutyId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkBlocks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkBlocks_VehicleDuties_VehicleDutyId",
                        column: x => x.VehicleDutyId,
                        principalTable: "VehicleDuties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkBlocks_VehicleDutyId",
                table: "WorkBlocks",
                column: "VehicleDutyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkBlocks");

            migrationBuilder.DropTable(
                name: "VehicleDuties");
        }
    }
}
