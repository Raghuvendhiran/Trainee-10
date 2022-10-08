import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Formik } from "formik";

function App() {
  const [userData, SetUserData] = useState([]);

  const [formData, setFormData] = useState({
    Id: "",
    Name: "",
    Age: "",
    Email: "",
    Gender: "",
    Courses: "",
  });

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://628f71f1dc47852365409a6e.mockapi.io/v1/Array"
      );
      SetUserData(response.data);
    }
    getData();
  }, []);

  const Edit = (Id) => {
    const update = userData.filter((row) => row.Id === Id)[0];
    setFormData({ ...update });
  };

  const handleDelete = async (Id) => {
    await axios.delete(
      `https://628f71f1dc47852365409a6e.mockapi.io/v1/Array/${Id}`
    );
    const deleteRow = userData.filter((row) => row.Id !== Id);
    SetUserData(deleteRow);
  };

  const validateForm = (formValidate) => {
    let error = {};
    if (formValidate.Name === "") error.Name = "Name is Required";
    if (formValidate.Age === "") error.Age = "Age is Required";
    if (formValidate.Email === "") error.Email = "Email is Required";
    if (formValidate.Gender === "") error.Gender = "Gender is Required";
    if (formValidate.Courses === "") error.Courses = "Courses is Required";
    return error;
  };

  const handleSubmit = async (formDatacopy, { resetForm }) => {
    if (formData.Id) {
      const response3 = await axios.put(
        `https://628f71f1dc47852365409a6e.mockapi.io/v1/Array/${formData.Id}`,
        { ...formDatacopy }
      );

      let user = [...userData];
      let index = userData.findIndex((row) => row.Id === formData.Id);
      user[index] = response3.data;
      SetUserData(user);
      resetForm();
    } else {
      const response4 = await axios.post(
        "https://628f71f1dc47852365409a6e.mockapi.io/v1/Array",
        { ...formDatacopy }
      );
      SetUserData([...userData, response4.data]);
    }
    resetForm();
  };

  return (
    <>
      <h1>CRED With Formik</h1>
      <Formik
        initialValues={formData}
        validate={validateForm}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          resetForm,
        }) => (
          <>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                id="Name"
                label="Name"
                variant="outlined"
                value={values.Name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />
              <span style={{ color: "red" }}>
                {touched.Name && errors.Name}
              </span>
              <br />
              <TextField
                type="number"
                id="Age"
                label="Age"
                variant="outlined"
                value={values.Age}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />
              <span style={{ color: "red" }}>{touched.Age && errors.Age}</span>
              <br />
              <TextField
                id="Email"
                label="Email"
                variant="outlined"
                value={values.Email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <br />
              <span style={{ color: "red" }}>
                {touched.Email && errors.Email}
              </span>
              <br />
              <FormControl>
                <FormLabel id="Gender">Gender</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="Gender"
                  id="Gender"
                  value={values.Gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <br />

                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />

                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
              <br />
              <span style={{ color: "red" }}>
                {touched.Gender && errors.Gender}
              </span>
              <br />
              <FormControl fullWidth>
                <InputLabel id="label-Courses">Courses</InputLabel>
                <Select
                  labelId="label-Courses"
                  id="Courses"
                  name="Courses"
                  label="Courses"
                  value={values.Courses}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value={"React JS"}>React JS</MenuItem>
                  <MenuItem value={"Node JS"}>Node JS</MenuItem>
                  <MenuItem value={"MySQL"}>MySQL</MenuItem>
                </Select>
              </FormControl>
              <br />
              <span style={{ color: "red" }}>
                {touched.Courses && errors.Courses}
              </span>
              <br />
              <Button variant="contained" type="submit" disabled={isSubmitting}>
                Add
              </Button>
              &nbsp;
              <Button variant="contained" onClick={() => resetForm()}>
                Reset
              </Button>
            </Box>
          </>
        )}
      </Formik>
      <br />
      <br />
      <h3>Mock API - UserData</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Courses</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row) => (
              <TableRow key={row.Id}>
                <TableCell component="th" scope="row">
                  {row.Id}
                </TableCell>
                <TableCell align="center">{row.Name}</TableCell>
                <TableCell align="center">{row.Age}</TableCell>
                <TableCell align="center">{row.Email}</TableCell>
                <TableCell align="center">{row.Gender}</TableCell>
                <TableCell align="center">{row.Courses}</TableCell>
                <TableCell>
                  <Button variant="text" onClick={() => Edit(row.Id)}>
                    Edit
                  </Button>
                  <Button variant="text" onClick={() => handleDelete(row.Id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default App;
