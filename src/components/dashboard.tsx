import React, { useState} from "react";
import {
  useGetAddUserMutation,
  useGetAllUserDataQuery,
  useGetDeleteUserMutation,
  useGetEitUserMutation,
  useGetUpdateUserMutation,
} from "../services/createSlice";
import Table from "react-bootstrap/Table";
import { IUserData, IAddUser } from "./interFace";
import "./style.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  makeStyles,
  Container,
  Typography,
  TextField,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    margin: theme.spacing(1, 0, 4),
  },
}));

const Dashboard = () => {
  const { data, isLoading } = useGetAllUserDataQuery();
  const [deleteUser] = useGetDeleteUserMutation();
  const [addUser] = useGetAddUserMutation();
  const [editUser, editUserInfo] = useGetEitUserMutation();
  const [updateUser] = useGetUpdateUserMutation();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const { heading } = useStyles();
  const handleShow = () => setShow(true);
  const [ detLoader, setdetLoader] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    // formState: { errors },
  } = useForm<IAddUser>();

  const handleAddData = (data: IAddUser) => {
    if (editUserInfo?.data?._id) {
      console.log("update", data);
      updateUser(data);
      alert("Data Updated Successfully!");
    } else {
      addUser(data);
    }
    reset();
  };

  const handleDelete = (item: IUserData) => {
    deleteUser(item);
    setdetLoader(true)
  };

  const handleEditUser = (userId: IAddUser) => {
    editUser(userId);
    setValue("name", userId?.name);
    setValue("age", userId?.age);
    setValue("city", userId?.city);
    setValue("_id", userId?._id);
  };

  return (
    <div className="container">
      <div>
        <button className="addUserBtn btn btn-primary" onClick={handleShow}>
          Add User
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <Container maxWidth="xs">
              {
                 editUserInfo?.data ? <Typography className={heading} variant="h3" >Update User Form</Typography>
                 :  <Typography className={heading} variant="h3">Sign Up Form</Typography>
              }
            
              <form onSubmit={handleSubmit(handleAddData)}>
                <TextField
                  variant="outlined"
                  type="text"
                  margin="normal"
                  label="Full Name"
                  fullWidth
                  required
                  {...register("name")}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  label="Age"
                  fullWidth
                  required
                  {...register("age")}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  label="City"
                  type="text"
                  fullWidth
                  required
                  {...register("city")}
                />
                {isLoading ? (
                  <Spinner animation="border"  />
                ) : editUserInfo?.data?._id ? (
                  <button
                    type="submit"
                    className="addUserBtn btn btn-primary"
                    style={{ marginTop: "10px" }}
                  >
                    Update User
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="addUserBtn btn btn-primary"
                    style={{ marginTop: "10px" }}
                  >
                    Add User
                  </button>
                )}
              </form>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>_Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: IUserData, index) => (
            <tr key={index}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.city}</td>
              <td>
                 {
                    detLoader ? <Spinner animation="grow" variant="danger" /> :
                <button
                className="deleteBtn btn btn-danger"
                onClick={() => handleDelete(item)}
                >
                  Delete
                </button>
                }
              </td>
              <td onClick={handleShow}>
                <button
                  className="editBtn btn btn-success"
                  onClick={() => handleEditUser(item)}
                >
                  EditUser
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p>
        Don't Have A Account ..? <NavLink to="/signup">SignUp</NavLink>{" "}
      </p>
    </div>
  );
};

export default Dashboard;
