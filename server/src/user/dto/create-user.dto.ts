export class CreateUserDto {
	/*@IsString()
	@IsEmail({}, { message: "Почта должна быть действительной" })*/
	email: string;

	/*@IsString()
	@Matches(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
		{
			message:
				"Пароль должен содержать минимум одну букву верхнего и нижнего регистра, цифру и специальный символ",
		},
	)*/
	password: string;
}
