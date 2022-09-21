interface UserAdapterType {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string;
    passwordConfirm: string;
}

export const createUserAdapter = (user: UserAdapterType) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    password: user.password,
    passwordConfirm: user.passwordConfirm,
});
