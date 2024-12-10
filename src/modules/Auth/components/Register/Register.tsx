import {
  Box,
  Button,
  FormControl,
  Grid2,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { User_URls } from "../../../../constants/End_Points";
import { toast } from "react-toastify";
import RegisterImg from "../../../../assets/images/register.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import defaultUserImage from "../../../../assets/images/default-user.jpg";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();

  interface FormValue {
    userName: string;
    phoneNumber: string;
    country: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImage: FileList;
    role: string;
  }

  const convertToFormData = (data: FormValue): FormData => {
    const inputFormData = new FormData();
    inputFormData.append("userName", data.userName);
    inputFormData.append("email", data.email);
    inputFormData.append("country", data.country);
    inputFormData.append("phoneNumber", data.phoneNumber);

    // If user uploaded a profile image, use it; otherwise, use a default image URL
    if (data.profileImage && data.profileImage.length > 0) {
      inputFormData.append("profileImage", data.profileImage[0]);
    } else {
      // Use the default image URL
      inputFormData.append(
        "profileImage",
        "http://localhost:5173/assets/images/default-user.jpg"
      );
    }

    inputFormData.append("password", data.password);
    inputFormData.append("confirmPassword", data.confirmPassword);
    inputFormData.append("role", data.role || "user");

    return inputFormData;
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValue>({
    defaultValues: {
      userName: "",
      phoneNumber: "",
      country: "",
      email: "",
      password: "",
      confirmPassword: "",
      profileImage: undefined,
      role: "user",
    },
  });

  const onSubmit = async (data: FormValue) => {
    try {
      const formData = convertToFormData(data);
      await axios.post(User_URls.register, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error: any) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message || "Failed to Register!");
    }
  };

  return (
    <div>
      <Box
        sx={{
          height: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Grid2 container sx={{ flex: 1 }}>
          <Grid2
            sx={{
              width: { xs: "90%", sm: "95%", md: "50%" },
              margin: "auto",
              padding: { xs: 2, md: 2 },
              Grid2Column: { xs: "span 12", md: "span 6" },
            }}
          >
            <Stack
              sx={{
                marginLeft: { xs: 0, md: "3%" },
                position: "absolute",
                top: "19px",
                left: "-20px",
              }}
              height={{ xs: "auto", sm: "auto" }}
            >
              <Typography
                variant="h5"
                style={{ fontSize: "27px", fontWeight: "500" }}
                component="p"
              >
                <span style={{ color: "#3252DF" }}>Stay</span>
                <span style={{ color: "#152C5B" }}>cation.</span>
              </Typography>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                margin: "auto",
                paddingX: "100px",
                paddingTop: "50px",
              }}
            >
              <Stack>
                <Typography
                  variant="h2"
                  style={{ fontSize: "30px", fontWeight: "500" }}
                >
                  Sign Up
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    fontWeight: "500",
                    marginY: 3,
                  }}
                >
                  <span>If you already have an account, you can</span>
                  <br />
                  <span>
                    You can {""}
                    <Link
                      to={"/login"}
                      style={{
                        color: "#d50000",
                        textDecoration: "none",
                        fontWeight: "600",
                      }}
                    >
                      Login here!
                    </Link>{" "}
                  </span>
                </Typography>
              </Stack>
              <FormControl
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: "flex", flexDirection: "column" }}
                component="form"
              >
                {/* Username */}
                <label
                  htmlFor="userName"
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  Username
                </label>
                <TextField
                  sx={{
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "none",
                  }}
                  type="text"
                  placeholder="Please type here ..."
                  id="userName"
                  error={!!errors.userName}
                  helperText={errors.userName?.message}
                  {...register("userName", {
                    required: "Username is required",
                  })}
                />

                {/* Phone Number and Country */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 2, md: 4 }}
                >
                  <Stack width="100%">
                    <label
                      htmlFor="phoneNumber"
                      style={{
                        fontSize: "16px",
                        fontWeight: 400,
                        color: "#152C5B",
                      }}
                    >
                      Phone Number
                    </label>
                    <TextField
                      sx={{
                        marginBottom: 1,
                        bgcolor: "#f5f6f8",
                        border: "none",
                      }}
                      type="tel"
                      placeholder="Please type here ..."
                      id="phoneNumber"
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber?.message}
                      {...register("phoneNumber", {
                        required: "Phone Number is required",
                      })}
                    />
                  </Stack>

                  <Stack width="100%">
                    <label
                      htmlFor="country"
                      style={{
                        fontSize: "16px",
                        fontWeight: 400,
                        color: "#152C5B",
                      }}
                    >
                      Country
                    </label>
                    <TextField
                      sx={{
                        marginBottom: 1,
                        bgcolor: "#f5f6f8",
                        border: "none",
                      }}
                      type="text"
                      placeholder="Please type here ..."
                      id="country"
                      error={!!errors.country}
                      helperText={errors.country?.message}
                      {...register("country", {
                        required: "Country is required",
                      })}
                    />
                  </Stack>
                </Stack>

                {/* Email Address */}
                <label
                  htmlFor="email"
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  Email Address
                </label>
                <TextField
                  sx={{
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "none",
                  }}
                  type="email"
                  placeholder="Please type here ..."
                  id="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register("email", { required: "Email is required" })}
                />

                {/* Password */}
                <label
                  htmlFor="password"
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  Password
                </label>
                <TextField
                  sx={{
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "none",
                  }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Please type here ..."
                  id="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Confirm Password */}
                <label
                  htmlFor="confirmPassword"
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  Confirm Password
                </label>
                <TextField
                  sx={{
                    marginBottom: 1,
                    bgcolor: "#f5f6f8",
                    border: "none",
                  }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Please type here ..."
                  id="confirmPassword"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                  })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Profile Image */}
                <label
                  htmlFor="profileImage"
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "#152C5B",
                  }}
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  id="profileImage"
                  {...register("profileImage")}
                />

                {/* Submit Button */}
                <Button
                  disabled={isSubmitting}
                  sx={{ mt: 6 }}
                  type="submit"
                  variant="contained"
                >
                  Sign Up
                </Button>
              </FormControl>
            </Stack>
          </Grid2>

          {/* Grid2 for Image */}
          <Grid2
            display={{ xs: "none", md: "block" }}
            size={{ xs: 12, md: 6 }}
            sx={{
              position: "sticky",
              top: 0, // Stick to the top of the viewport
              height: "100vh",
              backgroundImage: `url(${RegisterImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderRadius: "15px",
              zIndex: 1, // Ensure it's on top of other content
            }}
          ></Grid2>
        </Grid2>
      </Box>
    </div>
  );
}
