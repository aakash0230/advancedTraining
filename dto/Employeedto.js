class validation {
    constructor(name, email, password) {
        (this.name = name), (this.email = email), (this.password = password);
    }
    validateSignUp() {
        const error = {};
        if (!this.name) {
            error.name = "name is required";
        } else if (!this.isValidName()) {
            error.name = "name format is invalid";
        }

        if (!this.email) {
            error.email = "email is required";
        } else if (!this.isValidEmail()) {
            error.email = "email format is invalid";
        }

        if (!this.password) {
            error.password = "password is required";
        } else if (!this.isValidPassword()) {
            error.password = "password is invalid";
        }
        return {
            isValid: Object.keys(error).length === 0,
            error,
        };
    }

    validateSignIn() {
        const error = {};
        if (!this.email) {
            error.email = "email is required";
        } else if (!this.isValidEmail()) {
            error.email = "email format is invalid";
        }

        if (!this.password) {
            error.password = "password is required";
        } else if (!this.isValidPassword()) {
            error.password = "password is invalid";
        }
        return {
            isValid: Object.keys(error).length === 0,
            error,
        };
    }

    isValidName() {
        const nameRegex = /^[a-zA-Z\s']+$/;
        return nameRegex.test(this.name);
    }
    isValidEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }
    isValidPassword() {
        return this.password.length >= 8;
    }
}

module.exports = validation;