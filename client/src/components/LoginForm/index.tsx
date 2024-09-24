import { useState } from "react"
import { login } from "@/utils/customerService"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login as loginCustomer } from "@/features/customerSlice"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { loginSchema as validationSchema } from "@/schemas/validationSchemas"
import { loginFormStyles as styles } from "@/styles/styles"


const LoginForm = () => {

  const [submit, setSubmit] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (username: string, password: string): Promise<void> => {
    setSubmit(true)
    const loginAttempt: any = await login(username, password)
    if (loginAttempt) {
      dispatch(loginCustomer(loginAttempt))
      navigate("/products")
    } else {
      setSubmit(false)
      setError(true)
    }
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleLogin(values.username, values.password)
    },
  });

  return (
    <div className={styles.login}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <span className={styles.span}>Login</span>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={formik.handleChange}
          value={formik.values.username}
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className={styles.input}
        />
        {formik.errors.username && (
          <p className={styles.error}>{formik.errors.username}</p>
        )}
        {formik.errors.password && (
          <p className={styles.error}>{formik.errors.password}</p>
        )}
        <div className="flex flex-row items-center">
          <button
            disabled={submit}
            type="submit"
            className={styles.button}
          >
            Login
          </button>
          <FontAwesomeIcon className={`${submit ? "visible" : "invisible"} animate-spin text-xl`} icon={faSpinner} data-testid="loading-spinner" />
        </div>
        { error ? <p className="text-sm text-red">Login Failed: Invalid Username or Password</p>: ""}
      </form>
    </div>
  )
}

export default LoginForm