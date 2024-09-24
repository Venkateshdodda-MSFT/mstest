import * as Yup from "yup";

// Common validation rules
const username = Yup.string()
  .required("Username is a required field")
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username cannot exceed 20 characters")

const password = Yup.string()
  .required("Password is a required field")
  .min(8, "Password must be at least 8 characters")

const firstName = Yup.string()
  .required("First name is required")
  .matches(/^[A-Za-z]+$/, "First name should contain only letters")
  .max(50, "First name cannot exceed 50 characters")

const lastName = Yup.string()
  .required("Last name is required")
  .matches(/^[A-Za-z]+$/, "Last name should contain only letters")
  .max(50, "Last name cannot exceed 50 characters")

const phone = Yup.string()
  .required("Phone number is required")
  .matches(/^\+?[1-9]\d{1,14}$/, "Phone number is not valid")

const city = Yup.string()
  .min(2, 'City name should be at least 2 characters long')
  .required('City is required')

const state = Yup.string()
  .matches(/^[A-Za-z]{2}$/, 'State should be a 2-letter abbreviation')
  .required('State is required')

const address = Yup.string()
  .required("Address is required")
  .max(100, "Address cannot exceed 100 characters")

const zipCode = Yup.string()
  .required("Zipcode is required")
  .matches(/^[0-9]{5}(?:-[0-9]{4})?$/, "Invalid ZIP code").required("Required")


const email = Yup.string()
  .required("Email is a required field")
  .email("Invalid email format");

// Schemas using common validation rules
export const loginSchema = Yup.object().shape({
  username,
  password,
});

export const registerSchema = Yup.object().shape({
  firstName,
  lastName,
  phone,
  address,
  username,
  email,
  passwordHash: password,
})

export const orderSchema = Yup.object().shape({
  firstName,
  lastName,
  email,
  address,
  city,
  state,
  zipCode,
})