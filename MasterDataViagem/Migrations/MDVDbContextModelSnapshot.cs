﻿// <auto-generated />
using System;
using MasterDataViagem.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MasterDataViagem.Migrations
{
    [DbContext(typeof(MDVDbContext))]
    partial class MDVDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
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

            modelBuilder.Entity("MasterDataViagem.Domain.PassingTime.PassingTimes", b =>
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

                    b.Property<string>("TripId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("key")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("TripId");

                    b.ToTable("PassingTimes");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.Trip.Trip", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("IsEmpty")
                        .HasColumnType("bit");

                    b.Property<bool>("IsGenerated")
                        .HasColumnType("bit");

                    b.Property<string>("Line")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Orientation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Path")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("key")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Trips");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.PassingTime.PassingTimes", b =>
                {
                    b.HasOne("MasterDataViagem.Domain.Trip.Trip", null)
                        .WithMany("PassingTimes")
                        .HasForeignKey("TripId");
                });

            modelBuilder.Entity("MasterDataViagem.Domain.Trip.Trip", b =>
                {
                    b.Navigation("PassingTimes");
                });
#pragma warning restore 612, 618
        }
    }
}
