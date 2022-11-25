import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useFormik, FormikProps } from "formik";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import * as Yup from "yup";
import type { AppDispatch } from "../../store";
import {
  fetchAllUsers,
  fetchUserDetails,
  modifyUserDetails,
  usersSelector,
} from "../../slices/usersSlice";

interface FormikValues {
  username: string;
  email: string;
  street: string;
  suite: string;
  city: string;
}

const UserSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  street: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  suite: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  city: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const EditUser: React.FC = () => {
  const { userDetails } = useSelector(usersSelector);
  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams<{ userId?: any }>();

  const navigate = useNavigate();
  const { state } = useLocation();

  const formik: FormikProps<FormikValues> = useFormik({
    initialValues: {
      username: userDetails?.username ?? "",
      email: userDetails?.email ?? "",
      street: userDetails.address ? userDetails.address.street : "",
      suite: userDetails.address ? userDetails.address.suite : "",
      city: userDetails.address ? userDetails.address.city : "",
    },
    validationSchema: UserSchema,
    enableReinitialize: true,
    onSubmit: (updatedUserData: any) => {
      dispatch(fetchAllUsers());
      dispatch(
        modifyUserDetails({
          userId: userId,
          userUpdatedData: {
            username: updatedUserData.username,
            email: updatedUserData.email,
            address: {
              street: updatedUserData.street,
              suite: updatedUserData.suite,
              city: updatedUserData.city,
            },
          },
          location: state,
        })
      )
        .unwrap()
        .then((_) => {
          toast.success("User details updated.");
          return navigate("/");
        });
    },
  });

  useEffect(() => {
    dispatch(fetchUserDetails(userId));
  }, [dispatch]);

  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      <form onSubmit={formik.handleSubmit}>
        <h1>Edit User</h1>
        <TextField
          margin="dense"
          error={Boolean(formik.errors.username)}
          helperText={formik.errors.username}
          id="username"
          name="username"
          label="Username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          error={Boolean(formik.errors.email)}
          helperText={formik.errors.email}
          id="email"
          name="email"
          label="Email Address"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          error={Boolean(formik.errors.street)}
          helperText={formik.errors.street}
          id="street"
          name="street"
          label="Address Street"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.street}
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          error={Boolean(formik.errors.suite)}
          helperText={formik.errors.suite}
          id="suite"
          name="suite"
          label="Address Suite"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.suite}
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          error={Boolean(formik.errors.city)}
          helperText={formik.errors.city}
          id="city"
          name="city"
          label="Address City"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.city}
          fullWidth
          variant="standard"
        />
        <Stack style={{ margin: "10px" }} spacing={2} direction="row">
          <Button disabled={!(formik.isValid && formik.dirty)} type="submit">
            Submit
          </Button>
          <Button onClick={() => navigate(`/`)} color="error">
            Cancel
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default EditUser;
