﻿// <auto-generated />
using System;
using MasterDataViagem.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MasterDataViagem.Migrations
{
    [DbContext(typeof(MDVDbContext))]
    [Migration("20210114200111_DriverDutyTypes")]
    partial class DriverDutyTypes
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("MasterDataViagem.Domain.Driver.Driver", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("birthdate")
                        .HasColumnType("datetime2");

                    b.Property<int>("driverLicenseNum")
                        .HasColumnType("int");

                    b.Property<DateTime>("licenseExpiration")
                        .HasColumnType("datetime2");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Drivers");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.DriverDuties.DriverDuty", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("color")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("key")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("type")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("DriverDuties");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.DriverDutyTypes.DriverDutyType", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("key")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("DriverDutyTypes");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.Genetics.Genetic", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("evaluation")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Genetics");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.Genetics.Population", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("GeneticId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("pop")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("GeneticId");

                    b.ToTable("Population");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.ParameterValues.ParameterValue", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("DriverDutyTypeId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("key")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("parameter")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DriverDutyTypeId");

                    b.ToTable("ParameterValues");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.PassingTimes.PassingTime", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("IsReliefPoint")
                        .HasColumnType("bit");

                    b.Property<bool>("IsUsed")
                        .HasColumnType("bit");

                    b.Property<string>("Node")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Time")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TripesId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("key")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("TripesId");

                    b.ToTable("PassingTimes");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.Trip.Tripes", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("IsEmpty")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IsGenerated")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Line")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Orientation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Path")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WorkBlockId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("key")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("WorkBlockId");

                    b.ToTable("Trips");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.User.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.Vehicle.Vehicle", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("firstServiceDate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("licensePlate")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("vehicleType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("vin")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Vehicles");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.VehicleDuties.VehicleDuty", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("color")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("depots")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("key")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("VehicleDuties");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.WorkBlocks.WorkBlock", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("DriverDutyId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("VehicleDutyId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("endNode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("endTime")
                        .HasColumnType("int");

                    b.Property<bool>("isActive")
                        .HasColumnType("bit");

                    b.Property<bool>("isCrewTravelTime")
                        .HasColumnType("bit");

                    b.Property<string>("key")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("startNode")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("startTime")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("DriverDutyId");

                    b.HasIndex("VehicleDutyId");

                    b.ToTable("WorkBlocks");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.Genetics.Population", b =>
                {
                    b.HasOne("MasterDataViagem.Domain.Genetics.Genetic", null)
                        .WithMany("population")
                        .HasForeignKey("GeneticId");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.ParameterValues.ParameterValue", b =>
                {
                    b.HasOne("MasterDataViagem.Domain.DriverDutyTypes.DriverDutyType", null)
                        .WithMany("parameters")
                        .HasForeignKey("DriverDutyTypeId");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.PassingTimes.PassingTime", b =>
                {
                    b.HasOne("MasterDataViagem.Domain.Trip.Tripes", null)
                        .WithMany("PassingTimes")
                        .HasForeignKey("TripesId");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.Trip.Tripes", b =>
                {
                    b.HasOne("MasterDataViagem.Domain.WorkBlocks.WorkBlock", null)
                        .WithMany("trips")
                        .HasForeignKey("WorkBlockId");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.WorkBlocks.WorkBlock", b =>
                {
                    b.HasOne("MasterDataViagem.Domain.DriverDuties.DriverDuty", null)
                        .WithMany("workBlocks")
                        .HasForeignKey("DriverDutyId");

                    b.HasOne("MasterDataViagem.Domain.VehicleDuties.VehicleDuty", null)
                        .WithMany("WorkBlocks")
                        .HasForeignKey("VehicleDutyId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("MasterDataViagem.Domain.User.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("MasterDataViagem.Domain.User.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MasterDataViagem.Domain.User.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("MasterDataViagem.Domain.User.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MasterDataViagem.Domain.DriverDuties.DriverDuty", b =>
                {
                    b.Navigation("workBlocks");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.DriverDutyTypes.DriverDutyType", b =>
                {
                    b.Navigation("parameters");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.Genetics.Genetic", b =>
                {
                    b.Navigation("population");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.Trip.Tripes", b =>
                {
                    b.Navigation("PassingTimes");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.VehicleDuties.VehicleDuty", b =>
                {
                    b.Navigation("WorkBlocks");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.WorkBlocks.WorkBlock", b =>
                {
                    b.Navigation("trips");
                });
#pragma warning restore 612, 618
        }
    }
}
