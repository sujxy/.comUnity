import {
  Button,
  Box,
  Divider,
  Typography,
  useTheme,
  TextField,
} from "@mui/material";
import { EditOutlined, Diversity3 } from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import WidgetWrapper from "components/WidgetWrapper";

const createSchema = yup.object().shape({
  name: yup.string().required("A name is required"),
  description: yup.string().required("specify type"),
  bio: yup.string().required("describle"),
  picture: yup.string().required("required"),
  cover: yup.string().required("required"),
});

const initialSchema = {
  name: "",
  description: "",
  bio: "",
  picture: "",
  cover: "",
};

const CreateWidget = () => {
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  const { palette } = useTheme();

  const navigate = useNavigate();

  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("bio", values.bio);
    formData.append("picture", values.picture);
    formData.append("cover", values.cover);
    formData.append("userId", _id);
    formData.append("picturePath", values.picture.name);
    formData.append("coverPath", values.cover.name);

    const response = await fetch(`http://localhost:3001/comunity/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (data) {
      onSubmitProps.resetForm();
      navigate(`/comunity/${data._id}`);
    }
  };

  return (
    <WidgetWrapper mr="10rem" width="40vw">
      <FlexBetween>
        <Box my="1rem">
          <Typography
            variant="h3"
            fontWeight="medium"
            color={palette.neutral.dark}
            mb="0.5rem"
          >
            <Diversity3
              sx={{
                fontSize: "1.5rem",
                color: palette.primary.main,
                mr: "0.5rem",
              }}
            />
            Create your Commuinty
          </Typography>
          <Typography sx={{ color: palette.neutral.medium, ml: "1rem" }}>
            Create your own community on our social media app today! Customize,
            engage, and build lasting relationships with like-minded
            individuals,A vibrant space for all to connect and thrive.
          </Typography>
        </Box>

        <img
          width="50%"
          height="50%"
          alt="unity"
          style={{ marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/createComunity.png`}
        />
      </FlexBetween>

      <Divider />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialSchema}
        validationSchema={createSchema}
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
              sx={{
                mt: "1rem",
                display: "grid",
                gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                gap: "1.3rem",
              }}
            >
              <TextField
                label="name"
                name="name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                variant="standard"
                errors={Boolean(touched.name) && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "1/span 2" }}
              ></TextField>

              <TextField
                label="description"
                name="description"
                value={values.description}
                onBlur={handleBlur}
                onChange={handleChange}
                variant="standard"
                errors={
                  Boolean(touched.description) && Boolean(errors.description)
                }
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "3/span 2" }}
              ></TextField>

              {/* ********image upload section****** */}
              <Box
                border={`1px solid ${palette.neutral.medium}`}
                p="0.25rem"
                my="1rem"
                gridColumn="1/span 2"
                borderRadius="1rem "
              >
                <Dropzone
                  acceptedFiles=".png,.jpg,.jpeg"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("picture", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <FlexBetween>
                      <Box
                        {...getRootProps()}
                        border={`1px solid ${palette.primary.main}`}
                        p="0.5rem"
                        width="100%"
                        borderRadius="1rem"
                        sx={{ "&hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <Typography color={palette.neutral.dark}>
                            Add profile here
                          </Typography>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                    </FlexBetween>
                  )}
                </Dropzone>
              </Box>

              {/* ****upload cover photo**** */}
              <Box
                border={`1px solid ${palette.neutral.medium}`}
                p="0.25rem"
                my="1rem"
                gridColumn="3/span 2"
                borderRadius="1rem "
              >
                <Dropzone
                  acceptedFiles=".png,.jpg,.jpeg"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("cover", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <FlexBetween>
                      <Box
                        {...getRootProps()}
                        border={`1px solid ${palette.primary.main}`}
                        p="0.5rem"
                        width="100%"
                        borderRadius="1rem"
                        sx={{ "&hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.cover ? (
                          <Typography color={palette.neutral.dark}>
                            Add cover here
                          </Typography>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.cover.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                    </FlexBetween>
                  )}
                </Dropzone>
              </Box>

              <TextField
                label="bio"
                name="bio"
                value={values.bio}
                onBlur={handleBlur}
                onChange={handleChange}
                variant="outlined"
                errors={Boolean(touched.bio) && Boolean(errors.bio)}
                helperText={touched.bio && errors.bio}
                multiline
                maxRows={4}
                sx={{ gridColumn: "span 4" }}
              ></TextField>

              <Button
                type="submit"
                gridColumn="1/span 2"
                sx={{
                  my: "1rem",

                  backgroundColor: palette.primary.main,
                  "&:hover": {
                    backgroundColor: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                <Typography sx={{ color: palette.neutral.light }}>
                  Create
                </Typography>
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </WidgetWrapper>
  );
};
export default CreateWidget;
