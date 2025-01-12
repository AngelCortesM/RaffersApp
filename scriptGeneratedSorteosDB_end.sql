USE [master]
GO
/****** Object:  Database [SorteosDB]    Script Date: 10/01/2025 2:05:44 p. m. ******/
CREATE DATABASE [SorteosDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SorteosDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\SorteosDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SorteosDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\SorteosDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [SorteosDB] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SorteosDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SorteosDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SorteosDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SorteosDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SorteosDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SorteosDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [SorteosDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SorteosDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SorteosDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SorteosDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SorteosDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SorteosDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SorteosDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SorteosDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SorteosDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SorteosDB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [SorteosDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SorteosDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SorteosDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SorteosDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SorteosDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SorteosDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SorteosDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SorteosDB] SET RECOVERY FULL 
GO
ALTER DATABASE [SorteosDB] SET  MULTI_USER 
GO
ALTER DATABASE [SorteosDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SorteosDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SorteosDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SorteosDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SorteosDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SorteosDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'SorteosDB', N'ON'
GO
ALTER DATABASE [SorteosDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [SorteosDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [SorteosDB]
GO
/****** Object:  Table [dbo].[AssignedNumbers]    Script Date: 10/01/2025 2:05:44 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AssignedNumbers](
	[idAssignedNumber] [int] IDENTITY(1,1) NOT NULL,
	[idClient] [int] NULL,
	[idRaffleByClient] [int] NULL,
	[idUser] [int] NULL,
	[number] [nvarchar](5) NOT NULL,
	[createdAt] [datetime] NULL,
	[updatedAt] [datetime] NULL,
	[isActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[idAssignedNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_AssignedNumbers_Number] UNIQUE NONCLUSTERED 
(
	[number] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clients]    Script Date: 10/01/2025 2:05:44 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clients](
	[idClient] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[createdAt] [datetime] NULL,
	[updatedAt] [datetime] NULL,
	[isActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[idClient] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RaffleByClient]    Script Date: 10/01/2025 2:05:44 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RaffleByClient](
	[idRaffleByClient] [int] IDENTITY(1,1) NOT NULL,
	[idClient] [int] NULL,
	[idRaffle] [int] NULL,
	[createdAt] [datetime] NULL,
	[updatedAt] [datetime] NULL,
	[isActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[idRaffleByClient] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_RaffleByClient] UNIQUE NONCLUSTERED 
(
	[idClient] ASC,
	[idRaffle] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Raffles]    Script Date: 10/01/2025 2:05:44 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Raffles](
	[idRaffle] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](100) NOT NULL,
	[createdAt] [datetime] NULL,
	[updatedAt] [datetime] NULL,
	[isActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[idRaffle] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 10/01/2025 2:05:44 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[idUser] [int] IDENTITY(1,1) NOT NULL,
	[idClient] [int] NULL,
	[name] [nvarchar](100) NOT NULL,
	[createdAt] [datetime] NULL,
	[updatedAt] [datetime] NULL,
	[isActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[idUser] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[AssignedNumbers] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[AssignedNumbers] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[AssignedNumbers] ADD  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[Clients] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Clients] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[Clients] ADD  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[RaffleByClient] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[RaffleByClient] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[RaffleByClient] ADD  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[Raffles] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Raffles] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[Raffles] ADD  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [createdAt]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [updatedAt]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((1)) FOR [isActive]
GO
ALTER TABLE [dbo].[AssignedNumbers]  WITH CHECK ADD  CONSTRAINT [FK_AssignedNumbers_Clients] FOREIGN KEY([idClient])
REFERENCES [dbo].[Clients] ([idClient])
GO
ALTER TABLE [dbo].[AssignedNumbers] CHECK CONSTRAINT [FK_AssignedNumbers_Clients]
GO
ALTER TABLE [dbo].[AssignedNumbers]  WITH CHECK ADD  CONSTRAINT [FK_AssignedNumbers_RaffleByClient] FOREIGN KEY([idRaffleByClient])
REFERENCES [dbo].[RaffleByClient] ([idRaffleByClient])
GO
ALTER TABLE [dbo].[AssignedNumbers] CHECK CONSTRAINT [FK_AssignedNumbers_RaffleByClient]
GO
ALTER TABLE [dbo].[AssignedNumbers]  WITH CHECK ADD  CONSTRAINT [FK_AssignedNumbers_Users] FOREIGN KEY([idUser])
REFERENCES [dbo].[Users] ([idUser])
GO
ALTER TABLE [dbo].[AssignedNumbers] CHECK CONSTRAINT [FK_AssignedNumbers_Users]
GO
ALTER TABLE [dbo].[RaffleByClient]  WITH CHECK ADD  CONSTRAINT [FK_RaffleByClient_Clients] FOREIGN KEY([idClient])
REFERENCES [dbo].[Clients] ([idClient])
GO
ALTER TABLE [dbo].[RaffleByClient] CHECK CONSTRAINT [FK_RaffleByClient_Clients]
GO
ALTER TABLE [dbo].[RaffleByClient]  WITH CHECK ADD  CONSTRAINT [FK_RaffleByClient_Raffles] FOREIGN KEY([idRaffle])
REFERENCES [dbo].[Raffles] ([idRaffle])
GO
ALTER TABLE [dbo].[RaffleByClient] CHECK CONSTRAINT [FK_RaffleByClient_Raffles]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD FOREIGN KEY([idClient])
REFERENCES [dbo].[Clients] ([idClient])
GO
/****** Object:  StoredProcedure [dbo].[AssignRaffleToClient]    Script Date: 10/01/2025 2:05:44 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AssignRaffleToClient]
    @IdClient INT,
    @IdRaffle INT
AS
BEGIN
    
    IF NOT EXISTS (SELECT 1 FROM Clients WHERE IdClient = @IdClient)
    BEGIN
        RAISERROR('El cliente con el Id proporcionado no existe.', 16, 1);
        RETURN;
    END

    
    IF NOT EXISTS (SELECT 1 FROM Raffles WHERE IdRaffle = @IdRaffle)
    BEGIN
        RAISERROR('El sorteo con el Id proporcionado no existe.', 16, 1);
        RETURN;
    END

    
    IF EXISTS (SELECT 1 FROM RaffleByClient WHERE IdClient = @IdClient AND IdRaffle = @IdRaffle)
    BEGIN
        RAISERROR('El sorteo ya ha sido asignado a este cliente.', 16, 1);
        RETURN;
    END

    
    INSERT INTO RaffleByClient (IdClient, IdRaffle, IsActive)
    VALUES (@IdClient, @IdRaffle, 1);
END
GO
/****** Object:  StoredProcedure [dbo].[AssignRandomNumber]    Script Date: 10/01/2025 2:05:44 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[AssignRandomNumber]
    @IdClient INT,
    @IdRaffle INT,
    @IdUser INT,
    @GeneratedNumber INT OUTPUT,
    @Success BIT OUTPUT,
    @Message NVARCHAR(255) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    SET @Success = 0;
    SET @GeneratedNumber = NULL;

    IF NOT EXISTS (SELECT 1 FROM Clients WHERE idClient = @IdClient)
    BEGIN
        SET @Message = 'El cliente no existe.';
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Raffles WHERE idRaffle = @IdRaffle)
    BEGIN
        SET @Message = 'El sorteo no existe.';
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM Users WHERE idUser = @IdUser AND idClient = @IdClient)
    BEGIN
        SET @Message = 'El usuario no existe o no pertenece al cliente especificado.';
        RETURN;
    END

    DECLARE @IdRaffleByClient INT;
    SELECT @IdRaffleByClient = idRaffleByClient
    FROM RaffleByClient
    WHERE idClient = @IdClient AND idRaffle = @IdRaffle;

    IF @IdRaffleByClient IS NULL
    BEGIN
        SET @Message = 'El cliente no está asociado al sorteo.';
        RETURN;
    END

    DECLARE @number INT;
    DECLARE @formattedNumber NVARCHAR(5);
    DECLARE @maxNumber INT = 99999;
    DECLARE @minNumber INT = 1;
    DECLARE @attempts INT = 0;

    WHILE @attempts < 1000
    BEGIN
        SET @number = FLOOR(RAND() * (@maxNumber - @minNumber + 1)) + @minNumber;
        SET @formattedNumber = RIGHT('00000' + CAST(@number AS NVARCHAR(5)), 5);

        IF NOT EXISTS (
            SELECT 1
            FROM AssignedNumbers
            WHERE number = @formattedNumber AND idRaffleByClient = @IdRaffleByClient
        )
        BEGIN
            INSERT INTO AssignedNumbers (idClient, idRaffleByClient, idUser, number, isActive)
            VALUES (@IdClient, @IdRaffleByClient, @IdUser, @formattedNumber, 1);

            SET @GeneratedNumber = @number; 
            SET @Success = 1;
            SET @Message = 'Número asignado correctamente.';
            RETURN;
        END

        SET @attempts = @attempts + 1;
    END

    SET @Message = 'No se pudo generar un número único después de múltiples intentos. Por favor verifica si ya los usó todos.';
END;
GO
/****** Object:  StoredProcedure [dbo].[CreateClient]    Script Date: 10/01/2025 2:05:44 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateClient]
    @Name NVARCHAR(100),
    @IsActive BIT
AS
BEGIN
    
    INSERT INTO Clients (Name, IsActive, CreatedAt, UpdatedAt)
    VALUES (@Name, @IsActive, GETDATE(), GETDATE());
END
GO
/****** Object:  StoredProcedure [dbo].[CreateRaffle]    Script Date: 10/01/2025 2:05:44 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateRaffle]
    @Name NVARCHAR(255),
    @IsActive BIT
AS
BEGIN
    
    INSERT INTO Raffles (Name, CreatedAt, UpdatedAt, IsActive)
    VALUES (@Name, GETDATE(), GETDATE(), @IsActive)
END
GO
/****** Object:  StoredProcedure [dbo].[CreateUser]    Script Date: 10/01/2025 2:05:44 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CreateUser]
    @IdClient INT,
    @Name NVARCHAR(100),
    @IsActive BIT
AS
BEGIN
    
    IF NOT EXISTS (SELECT 1 FROM Clients WHERE IdClient = @IdClient)
    BEGIN
        RAISERROR('El cliente con el Id proporcionado no existe.', 16, 1);
        RETURN;
    END

    
    INSERT INTO Users (IdClient, Name, IsActive)
    VALUES (@IdClient, @Name, @IsActive);
END
GO
/****** Object:  StoredProcedure [dbo].[GetAllClients]    Script Date: 10/01/2025 2:05:44 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAllClients]
AS
BEGIN
    SELECT IdClient, Name, CreatedAt, UpdatedAt, IsActive
    FROM Clients
    
    
END
GO
/****** Object:  StoredProcedure [dbo].[GetAssignedNumbersPaged]    Script Date: 10/01/2025 2:05:44 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE   PROCEDURE [dbo].[GetAssignedNumbersPaged]
    @PageNumber INT,
    @PageSize INT,
    @ClientName NVARCHAR(100) = NULL,
    @RaffleName NVARCHAR(100) = NULL,
    @UserName NVARCHAR(100) = NULL,
    @TotalCount INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        an.IdAssignedNumber,
        an.IdClient,
        c.Name AS ClientName,
        an.IdRaffleByClient,
        r.Name AS RaffleName,
        an.IdUser,
        u.Name AS UserName,
      an.Number,
        an.IsActive
    FROM AssignedNumbers an
    INNER JOIN RaffleByClient rbc ON an.IdRaffleByClient = rbc.IdRaffleByClient
    INNER JOIN Clients c ON rbc.IdClient = c.IdClient
    INNER JOIN Raffles r ON rbc.IdRaffle = r.IdRaffle
    INNER JOIN Users u ON an.IdUser = u.IdUser
    WHERE 
        (@ClientName IS NULL OR c.Name LIKE '%' + @ClientName + '%') AND
        (@RaffleName IS NULL OR r.Name LIKE '%' + @RaffleName + '%') AND
        (@UserName IS NULL OR u.Name LIKE '%' + @UserName + '%')
    ORDER BY an.IdAssignedNumber
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;

    SELECT @TotalCount = COUNT(*)
    FROM AssignedNumbers an
    INNER JOIN RaffleByClient rbc ON an.IdRaffleByClient = rbc.IdRaffleByClient
    INNER JOIN Clients c ON rbc.IdClient = c.IdClient
    INNER JOIN Raffles r ON rbc.IdRaffle = r.IdRaffle
    INNER JOIN Users u ON an.IdUser = u.IdUser
    WHERE 
        (@ClientName IS NULL OR c.Name LIKE '%' + @ClientName + '%') AND
        (@RaffleName IS NULL OR r.Name LIKE '%' + @RaffleName + '%') AND
        (@UserName IS NULL OR u.Name LIKE '%' + @UserName + '%');
END;
GO
USE [master]
GO
ALTER DATABASE [SorteosDB] SET  READ_WRITE 
GO
