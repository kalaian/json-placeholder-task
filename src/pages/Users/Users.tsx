import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import type { AppDispatch } from "../../store";
import { fetchAllUsers, usersSelector } from "../../slices/usersSlice";
import "./Users.css";

const Users: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const { users } = useSelector(usersSelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleChange =
    (panel: string, data: object) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="main-container">
      {users.map(
        (
          { id, name, email, phone, username, website, address, company }: any,
          index: number
        ) => (
          <Accordion
            key={`user-${index}`}
            expanded={expanded === `user${index}`}
            onChange={handleChange(`user${index}`, {
              name,
              email,
              phone,
              username,
              website,
              address,
              company,
            })}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {name} | {phone}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>{email}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Username: {username}</Typography>
              <Typography>Website: {website}</Typography>
              <Typography>
                Address: {address.city} / {address.street} / {address.suite} /{" "}
                {address.zipcode}
              </Typography>
              <Typography>Company name: {company.name}</Typography>
              <Typography>
                Company catch phrase: {company.catchPhrase}
              </Typography>
              <Typography>Company bs: {company.bs}</Typography>
              <Stack style={{ margin: "10px" }} spacing={2} direction="row">
                <Link
                  to={`/edit-user/${id}`}
                  state={"users"}
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  <Button variant="contained">Edit user</Button>
                </Link>
                <Link
                  to={`/posts/${id}`}
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  <Button variant="outlined">See posts</Button>
                </Link>
              </Stack>
            </AccordionDetails>
          </Accordion>
        )
      )}
    </div>
  );
};

export default Users;
