import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../Stores/UserStore";

export default function Verification() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    EditUserVerificationData,
    getUserVerificationData,
    verificationData,
  } = useUserStore();

  useEffect(() => {
    console.log("Fetching verification data for id:", id);
    if (id) {
      getUserVerificationData(id);
    }
  }, [id, getUserVerificationData]); // Include id and getUserVerificationData as dependencies
  const handleConfirmVerification = async (action) => {
    try {
      if (action === "confirm") {
        await EditUserVerificationData({ id, is_verify: 1 });
      } else if (action === "deny") {
        await EditUserVerificationData({ id, is_verify: 0 });
      }
      navigate("/users");
    } catch (error) {
      console.error("Error confirming verification:", error);
    }
  };
  return (
    <Stack
      sx={{
        width: "90%",
        height: "100vh",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Typography variant="h2">Verification</Typography>
      <Stack
        sx={{ width: "100%", mt: 2 }}
        direction={{ md: "row", xs: "column" }}
      >
        <Stack sx={{ width: "50%" }} direction={"column"}>
          {verificationData?.verify_image && (
            <img
              style={{ width: "100%", height: "70vh" }}
              src={verificationData.verify_image}
              alt="verification image"
            />
          )}
        </Stack>
        <Stack
          sx={{ width: "50%", height: "100%" }}
          spacing={2}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h4">
            User Name: {verificationData?.name || "N/A"}
          </Typography>
          <Typography variant="h5">
            Verification Number: {verificationData?.number_verify || "N/A"}
          </Typography>
          <Stack
            sx={{ width: "100%" }}
            direction={"row"}
            spacing={2}
            justifyContent={"center"}
          >
            <Button
              variant="contained"
              color="error"
              onClick={() => navigate("/users")}
            >
              Cancel
            </Button>
            {verificationData?.is_verified === 0 && (
              <Button
                variant="contained"
                onClick={() => {
                  handleConfirmVerification("confirm");
                }}
              >
                Confirm Verification
              </Button>
            )}
            {verificationData?.is_verified === 1 && (
              <Button
                variant="contained"
                onClick={() => {
                  handleConfirmVerification("deny");
                }}
              >
                Deny Verification
              </Button>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
