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
  fetchAllPosts,
  fetchPostDetails,
  modifyPostDetails,
  postsSelector,
} from "../../slices/postsSlice";
import { fetchUserDetails } from "../../slices/usersSlice";

interface FormikValues {
  title: string;
  body: string;
}

const PostSchema = Yup.object().shape({
  title: Yup.string().min(2, "Too Short!").required("Required"),
  body: Yup.string().min(2, "Too Short!").required("Required"),
});

const EditPost: React.FC = () => {
  const { postDetails } = useSelector(postsSelector);
  const dispatch = useDispatch<AppDispatch>();
  const { postId } = useParams<{ postId?: any }>();

  const navigate = useNavigate();

  const formik: FormikProps<FormikValues> = useFormik({
    initialValues: {
      title: postDetails?.title ?? "",
      body: postDetails?.body ?? "",
    },
    validationSchema: PostSchema,
    enableReinitialize: true,
    onSubmit: (updatedPostData: any) => {
      dispatch(
        modifyPostDetails({ updatedPostData: updatedPostData, postId: postId })
      )
        .unwrap()
        .then(({ userId }) => {
          toast.success("Post details updated.");
          return navigate(`/posts/${userId}`);
        });
    },
  });

  useEffect(() => {
    dispatch(fetchPostDetails(postId));
  }, [dispatch]);

  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      <form onSubmit={formik.handleSubmit}>
        <h1>Edit User</h1>
        <TextField
          margin="dense"
          error={Boolean(formik.errors.title)}
          helperText={formik.errors.title}
          id="title"
          name="title"
          label="Title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
          fullWidth
          variant="standard"
        />
        <TextField
          margin="dense"
          error={Boolean(formik.errors.body)}
          helperText={formik.errors.body}
          id="body"
          name="body"
          label="Body"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.body}
          fullWidth
          variant="standard"
        />
        <Stack style={{ margin: "10px" }} spacing={2} direction="row">
          <Button disabled={!(formik.isValid && formik.dirty)} type="submit">
            Submit
          </Button>
          <Button
            onClick={() => navigate(`/posts/${postDetails.userId}`)}
            color="error"
          >
            Cancel
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default EditPost;
