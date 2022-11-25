import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

type UserDetailsCardProps = {
  userDetails: any;
  userId: any;
};

const UserDetailsCard: React.FC<UserDetailsCardProps> = ({
  userDetails,
  userId,
}) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {userDetails.phone} | {userDetails.email} | {userDetails.website}
        </Typography>
        <Typography variant="h5" component="div">
          {userDetails.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          username: {userDetails.username}
        </Typography>
        <Typography variant="body2">
          Address: {userDetails.address && userDetails.address.street} /{" "}
          {userDetails.address && userDetails.address.suite} /{" "}
          {userDetails.address && userDetails.address.city} /{" "}
          {userDetails.address && userDetails.address.zipcode}
        </Typography>
        <Typography variant="body2">
          Company name: {userDetails.company && userDetails.company.name}{" "}
        </Typography>
        <Typography variant="body2">
          Company catch phrase:
          {userDetails.company && userDetails.company.catchPhrase}
        </Typography>
        <Typography variant="body2">
          Company bs: {userDetails.company && userDetails.company.bs}{" "}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          to={`/edit-user/${userId}`}
          state={"posts"}
          style={{ color: "#fff", textDecoration: "none" }}
        >
          <Button variant="outlined">Edit user</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default UserDetailsCard;
