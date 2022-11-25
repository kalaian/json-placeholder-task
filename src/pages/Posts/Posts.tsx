import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import UserDetailsCard from "./UserDetailsCard";
import type { AppDispatch } from "../../store";
import {
  fetchPostInfoUserDetails,
  usersSelector,
} from "../../slices/usersSlice";
import {
  fetchAllPosts,
  fetchComments,
  deleteComment,
  deletePost,
  postsSelector,
} from "../../slices/postsSlice";
import "./Posts.css";

const Posts: React.FC = () => {
  const [isOpenCollapse, setIsOpenCollapse] = useState<any>(false);
  const [isConfirmationModalOpen, setModalOpen] = useState<boolean>(false);
  const [postDeleteId, setPostDeleteId] = useState<number>(0);

  const { userDetails } = useSelector(usersSelector);
  const { posts, comments } = useSelector(postsSelector);

  const dispatch = useDispatch<AppDispatch>();
  const { userId } = useParams<{ userId?: any }>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPostInfoUserDetails(userId));
    dispatch(fetchAllPosts(userId));
  }, [dispatch]);

  const handleOpen = (index: number, postId: number) => {
    if (isOpenCollapse === index) {
      setIsOpenCollapse(null);
    } else {
      setIsOpenCollapse(index);
      dispatch(fetchComments(postId));
    }
  };

  const handleCommentDelete = (commentId: number) => {
    dispatch(deleteComment(commentId))
      .unwrap()
      .then((_) => toast.success("Comment deleted."));
  };

  const handlePostDelete = () => {
    dispatch(deletePost(postDeleteId))
      .unwrap()
      .then((_) => {
        toast.success("Post deleted.");
        setIsOpenCollapse(null);
        return setModalOpen(false);
      });
  };

  const handleOpenModal = (postId: number) => {
    setModalOpen(true);
    setPostDeleteId(postId);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="main-container">
      {userDetails && (
        <UserDetailsCard userDetails={userDetails} userId={userId} />
      )}
      <Dialog
        open={isConfirmationModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This post will be deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePostDelete} autoFocus>
            Confirm
          </Button>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
      {posts.map(({ id, title, body }: any, index: number) => (
        <List
          key={`post-${index}`}
          sx={{ width: "100%", bgcolor: "background.paper" }}
        >
          <ListItem
            alignItems="flex-start"
            secondaryAction={
              <>
                <IconButton
                  onClick={() => navigate(`/edit-post/${id}`)}
                  edge="end"
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleOpenModal(id)}
                  edge="end"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
                <ListItemButton
                  style={{ marginLeft: "6px" }}
                  onClick={() => handleOpen(index, id)}
                >
                  {isOpenCollapse === index ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </>
            }
          >
            <ListItemText
              primary={title}
              secondary={
                <Typography
                  style={{ color: "rgba(0, 0, 0, 0.6)", width: "80%" }}
                >
                  {body}
                </Typography>
              }
            />
          </ListItem>
          <Collapse in={isOpenCollapse === index} timeout="auto" unmountOnExit>
            <h2>Comments section</h2>
            {comments &&
              comments.map(({ name, email, body, id }: any, index: number) => (
                <List
                  key={`comment-${index}`}
                  sx={{ width: "100%", bgcolor: "background.paper" }}
                >
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <IconButton
                        onClick={() => handleCommentDelete(id)}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={name}
                      secondary={
                        <>
                          <Typography
                            component={"span"}
                            style={{
                              color: "rgba(0, 0, 0, 0.7)",
                              fontWeight: "600",
                              width: "80%",
                            }}
                          >
                            {email}:
                          </Typography>
                          {"\n"}
                          <Typography
                            component={"span"}
                            style={{
                              color: "rgba(0, 0, 0, 0.4)",
                              width: "80%",
                            }}
                          >
                            {body}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              ))}
          </Collapse>
          <Divider variant="inset" component="li" />
        </List>
      ))}
    </div>
  );
};

export default Posts;
