-- Crear Clientes
EXEC CreateClient @Name = 'Supermercado El Sol', @IsActive = 1;
EXEC CreateClient @Name = 'Electrodomésticos González', @IsActive = 1;
EXEC CreateClient @Name = 'Librería La Paz', @IsActive = 1;
EXEC CreateClient @Name = 'Zapatería Buen Paso', @IsActive = 1;
EXEC CreateClient @Name = 'Ropa y Moda López', @IsActive = 1;

-- Crear Sorteos
EXEC CreateRaffle @Name = 'Sorteo de Navidad 2025', @IsActive = 1;
EXEC CreateRaffle @Name = 'Sorteo de Año Nuevo 2025', @IsActive = 1;
EXEC CreateRaffle @Name = 'Sorteo de Verano 2025', @IsActive = 1;

-- Asignar Sorteos a Clientes
EXEC AssignRaffleToClient @IdClient = 1, @IdRaffle = 1;
EXEC AssignRaffleToClient @IdClient = 2, @IdRaffle = 1;
EXEC AssignRaffleToClient @IdClient = 3, @IdRaffle = 2;
EXEC AssignRaffleToClient @IdClient = 4, @IdRaffle = 2;
EXEC AssignRaffleToClient @IdClient = 5, @IdRaffle = 3;
EXEC AssignRaffleToClient @IdClient = 5, @IdRaffle = 1;

-- Crear Usuarios
EXEC CreateUser @IdClient = 1, @Name = 'Carlos Fernández', @IsActive = 1;
EXEC CreateUser @IdClient = 2, @Name = 'Lucía Morales', @IsActive = 1;
EXEC CreateUser @IdClient = 2, @Name = 'José Rodríguez', @IsActive = 1;
EXEC CreateUser @IdClient = 3, @Name = 'María Gómez', @IsActive = 1;
EXEC CreateUser @IdClient = 4, @Name = 'Antonio Pérez', @IsActive = 1;
EXEC CreateUser @IdClient = 5, @Name = 'Raquel Soto', @IsActive = 1;
EXEC CreateUser @IdClient = 5, @Name = 'Patricia González', @IsActive = 1;
EXEC CreateUser @IdClient = 4, @Name = 'Juan López', @IsActive = 1;
EXEC CreateUser @IdClient = 4, @Name = 'Marta Hernández', @IsActive = 1;
EXEC CreateUser @IdClient = 5, @Name = 'Pedro Ruiz', @IsActive = 1;
EXEC CreateUser @IdClient = 3, @Name = 'Ana Martínez', @IsActive = 1;
EXEC CreateUser @IdClient = 2, @Name = 'Luis García', @IsActive = 1;

-- Asignar Números a Usuarios en los Sorteos
DECLARE @GeneratedNumber INT, @Success BIT, @Message NVARCHAR(255);
EXEC AssignRandomNumber @IdClient = 1, @IdRaffle = 1, @IdUser = 1, @GeneratedNumber = @GeneratedNumber OUTPUT, @Success = @Success OUTPUT, @Message = @Message OUTPUT;
EXEC AssignRandomNumber @IdClient = 1, @IdRaffle = 2, @IdUser = 2, @GeneratedNumber = @GeneratedNumber OUTPUT, @Success = @Success OUTPUT, @Message = @Message OUTPUT;
EXEC AssignRandomNumber @IdClient = 1, @IdRaffle = 3, @IdUser = 3, @GeneratedNumber = @GeneratedNumber OUTPUT, @Success = @Success OUTPUT, @Message = @Message OUTPUT;
EXEC AssignRandomNumber @IdClient = 2, @IdRaffle = 1, @IdUser = 4, @GeneratedNumber = @GeneratedNumber OUTPUT, @Success = @Success OUTPUT, @Message = @Message OUTPUT;
EXEC AssignRandomNumber @IdClient = 2, @IdRaffle = 2, @IdUser = 5, @GeneratedNumber = @GeneratedNumber OUTPUT, @Success = @Success OUTPUT, @Message = @Message OUTPUT;
EXEC AssignRandomNumber @IdClient = 2, @IdRaffle = 3, @IdUser = 6, @GeneratedNumber = @GeneratedNumber OUTPUT, @Success = @Success OUTPUT, @Message = @Message OUTPUT;
EXEC AssignRandomNumber @IdClient = 3, @IdRaffle = 1, @IdUser = 7, @GeneratedNumber = @GeneratedNumber OUTPUT, @Success = @Success OUTPUT, @Message = @Message OUTPUT;
EXEC AssignRandomNumber @IdClient = 3, @IdRaffle = 2, @IdUser = 8, @GeneratedNumber = @GeneratedNumber OUTPUT, @Success = @Success OUTPUT, @Message = @Message OUTPUT;
EXEC AssignRandomNumber @IdClient = 4, @IdRaffle = 1, @IdUser = 9, @GeneratedNumber = @GeneratedNumber OUTPUT, @Success = @Success OUTPUT, @Message = @Message OUTPUT;
EXEC AssignRandomNumber @IdClient = 4, @IdRaffle = 2, @IdUser = 10, @GeneratedNumber = @GeneratedNumber OUTPUT, @Success = @Success OUTPUT, @Message = @Message OUTPUT;
EXEC AssignRandomNumber @IdClient = 5, @IdRaffle = 1, @IdUser = 11, @GeneratedNumber = @GeneratedNumber OUTPUT, @Success = @Success OUTPUT, @Message = @Message OUTPUT;
EXEC AssignRandomNumber @IdClient = 5, @IdRaffle = 2, @IdUser = 12, @GeneratedNumber = @GeneratedNumber OUTPUT, @Success = @Success OUTPUT, @Message = @Message OUTPUT;