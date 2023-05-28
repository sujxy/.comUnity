import { useState } from "react";
import {
  useMediaQuery,
  useTheme,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import { CameraAlt, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "state";
import FlexBetween from "components/FlexBetween";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  department: yup.string().required("required"),
  description: yup.string().required("required"),
  collegeName: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialRegisterValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  department: "",
  description: "",
  collegeName: "",
  picture: "",
};

const initialLoginValues = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width : 600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    console.log("values: ", values);
    //for form values with image
    const formData = new FormData();
    Object.keys(values).forEach((key) => formData.append(key, values[key]));
    formData.append("picturePath", values.picture.name);
    console.log("form data : ", formData);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );

    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const loggedIn = await loggedInResponse.json();
    console.log(loggedIn);
    onSubmitProps.resetForm();

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialLoginValues : initialRegisterValues}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            mt="20px"
            display="grid"
            gap="20px"
            gridTemplateColumns="repeat(4, minmax(0,1fr))"
            sx={{
              "&>div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <Box
                  gridColumm="1/span2"
                  gridRow="1/span2"
                  borderRadius="100%"
                  sx={{
                    border: `1px solid ${palette.neutral.medium}`,
                  }}
                >
                  <Dropzone
                    acceptedFiles=".jpeg,.jpg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      setFieldValue("picture", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        textAlign="center"
                        p="5px"
                        sx={{ "&hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <FlexBetween flexDirection="column">
                            <CameraAlt />
                            <p>add a profile picture</p> :
                          </FlexBetween>
                        ) : (
                          <FlexBetween flexDirection="column">
                            <Edit />
                            <Typography>{values.picture.name}</Typography>
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>

                <TextField
                  label="First Name "
                  name="firstName"
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    gridColumn: "3/span 2",
                  }}
                ></TextField>

                <TextField
                  label="Last Name "
                  name="lastName"
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "3/span 2", gridRow: "2" }}
                ></TextField>

                <TextField
                  label="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                ></TextField>

                <TextField
                  label="college"
                  name="collegeName"
                  value={values.collegeName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    Boolean(touched.collegeName) && Boolean(errors.collegeName)
                  }
                  helperText={touched.collegeName && errors.collegeName}
                  sx={{ gridColumn: "span 4" }}
                ></TextField>

                <TextField
                  label="password"
                  name="password"
                  type="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 2" }}
                ></TextField>

                <TextField
                  label="what profile suits you best?"
                  name="description"
                  value={values.description}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 2" }}
                ></TextField>

                <TextField
                  label="department"
                  name="department"
                  value={values.department}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={
                    Boolean(touched.department) && Boolean(errors.department)
                  }
                  helperText={touched.department && errors.department}
                  sx={{ gridColumn: "span 2" }}
                ></TextField>

                <Button
                  type="submit"
                  gridColumn="span 1"
                  sx={{
                    backgroundColor: palette.primary.main,
                    p: 3,

                    "&hover": {
                      cursor: "pointer",
                      backgroundColor: palette.primary.light,
                    },
                  }}
                >
                  <Typography fontFamily="comfortaa" color="white">
                    register
                  </Typography>
                </Button>
              </>
            )}

            {isLogin && (
              <>
                <TextField
                  label="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                ></TextField>

                <TextField
                  label="password"
                  type="password"
                  name="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 4" }}
                ></TextField>

                <Button
                  type="submit"
                  gridColumn="span 1"
                  sx={{
                    backgroundColor: palette.primary.main,
                    p: 3,

                    "&hover": {
                      cursor: "pointer",
                      color: palette.primary.light,
                    },
                  }}
                >
                  <Typography fontFamily="comfortaa" color="white">
                    login
                  </Typography>
                </Button>
                <Box textAlign="right" gridColumn="span 4">
                  <img
                    width="60%"
                    height="auto"
                    alt="unity"
                    src={`http://localhost:3001/assets/loginVector.png`}
                  />
                </Box>
              </>
            )}
          </Box>

          <Typography
            onClick={() => {
              setPageType(isLogin ? "register" : "login");
              resetForm();
            }}
            sx={{
              textDecoration: "underline",
              fontFamily: "comfortaa",
              color: palette.primary.main,
              "&hover": {
                cursor: "pointer",
                color: palette.primary.light,
              },
            }}
          >
            {isLogin
              ? "dont have an account ? Register"
              : "already have an account? Login"}
          </Typography>
        </form>
      )}
    </Formik>
  );
};

export default Form;
