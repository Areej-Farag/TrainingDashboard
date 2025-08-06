import {
  Stack,
  Typography,
  Button,
  TextField,
  useTheme,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useCitiesStore } from "../../Stores/CitiesStore";
import { useCountriesStore } from "../../Stores/CountriesStore";
import { useUserStore } from "../../Stores/UserStore";
import { useTranslation } from "react-i18next";

export default function UserPageForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const action = id ? "Edit User" : "Add User";
  const { users, interesties, getInteresties, addNewUser, updateUser } = useUserStore();
  const [user, setUser] = useState(null);
  const { getCities, cities } = useCitiesStore();
  const { countries, getCountries } = useCountriesStore();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      name: "",
      email: "",
      phone: "",
      gender: "",
      birth_date: "",
      country_id: "",
      city_id: "",
      interests: [],
      image: null,
    },
  });
  const theme = useTheme();

  // Watch country_id to react to changes
  const watchedCountryId = watch("country_id");

  useEffect(() => {
    if (id && users?.length > 0) {
      const found = users.find((admin) => admin.id === Number(id));
      if (found) {
        setUser(found);
      }
    }
  }, [id, users]);

  useEffect(() => {
    getCities();
    getCountries();
    getInteresties();
  }, [getCities, getCountries, getInteresties]);

  useEffect(() => {
    if (action === "Edit User" && user && interesties?.length > 0) {
      setValue("id", user.id || "");
      setValue("name", user.name || "");
      setValue("email", user.email || "");
      setValue("phone", user.phone || "");
      setValue("gender", user.gender || "");
      setValue("birth_date", user.birth_date || "");
      setValue("country_id", user.country_id || "");
      setValue("city_id", user.city_id || "");
      setSelectedCountry(user.country_id || "");
      
      // Handle interests
      let interests = [];
      if (Array.isArray(user.interests)) {
        interests = user.interests.map(Number);
      } else if (user.interests) {
        try {
          interests = JSON.parse(user.interests).map(Number);
        } catch (e) {
          console.error("Error parsing user.interests:", e);
        }
      }
      const validInterests = interests.filter((id) =>
        interesties.some((interest) => interest.id === Number(id))
      );
      setSelectedInterests(validInterests);
      setValue("interests", validInterests);
      setValue("image", user.image || null);
    }
  }, [user, action, setValue, interesties]);

  // Update selectedCountry when country_id changes
  useEffect(() => {
    if (watchedCountryId !== selectedCountry) {
      setSelectedCountry(watchedCountryId);
      setValue("city_id", "");
    }
  }, [watchedCountryId, setValue, selectedCountry]);

  // Filter cities based on selected country
  const filteredCities = cities?.filter((city) => city.country_id === Number(selectedCountry)) || [];

  function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  }

  const handleInterestChange = (interestId, checked) => {
    const id = Number(interestId);
    let updatedInterests;
    if (checked) {
      updatedInterests = [...selectedInterests, id];
    } else {
      updatedInterests = selectedInterests.filter((existingId) => existingId !== id);
    }
    setSelectedInterests(updatedInterests);
    setValue("interests", updatedInterests);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("id", data.id || "");
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("type", "user");
    formData.append("gender", data.gender);
    formData.append("birth_date", data.birth_date);
    formData.append("age", calculateAge(data.birth_date).toString());
    formData.append("country_id", data.country_id);
    formData.append("city_id", data.city_id);
    // Ensure interests is sent as a JSON string or array based on backend requirements
    if (selectedInterests.length > 0) {
      formData.append("interests", JSON.stringify(selectedInterests));
    } else {
      formData.append("interests", "[]"); // Send empty array if no interests selected
    }
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    try {
      if (action === "Add User") {
        const response = await addNewUser(formData);
        if (response.status === 201) {
          reset();
          navigate("/users");
        }
      } else if (action === "Edit User" && user?.id) {
        const response = await updateUser(formData);
        console.log ("response :" , response);
        if (response.status === 200) {
          reset();
          navigate("/users");
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <Stack
      gap={2}
      p={2}
      sx={{
        margin: "auto",
        width: "90%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Typography variant="h4" sx={{ color: theme.palette.primary.main }}>
        {action === "Add User" ? t("Add User") : t("Edit User")}
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        style={{ width: "100%" }}
      >
        <Stack spacing={2} sx={{ width: "100%" , gap: "10px"}}>
          <Stack
            direction={{ lg: "row", xs: "column" }}
            spacing={2}
            sx={{ width: "100%" , gap: "10px"}}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { lg: "50%", xs: "100%"  },
              
              }}
            >
              <label htmlFor="name">{t("Name")}</label>
              <TextField
                sx={{
                  width: "100%",
                }}
                {...register("name", { required: t("Name is required") })}
                placeholder={t("Name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { lg: "50%", xs: "100%" },
              }}
            >
              <label htmlFor="email">{t("Email")}</label>
              <TextField
                sx={{
                  width: "100%",
                }}
                {...register("email", {
                  required: t("Email is required"),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t("Invalid email address"),
                  },
                })}
                placeholder={t("Email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Box>
          </Stack>
          <Stack
            direction={{ lg: "row", xs: "column" }}
            spacing={2}
            sx={{ width: "100%"  , gap: "10px"}}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { lg: "50%", xs: "100%" },
              }}
            >
              <label htmlFor="phone">{t("Phone")}</label>
              <TextField
                sx={{
                  width: "100%",
                }}
                {...register("phone", { required: t("Phone is required") })}
                placeholder={t("Phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { lg: "50%", xs: "100%" },
              }}
            >
              <label htmlFor="birth_date">{t("Birth Date")}</label>
              <TextField
                type="date"
                sx={{
                  width: "100%",
                }}
                {...register("birth_date", {
                  required: t("Birth Date is required"),
                })}
                error={!!errors.birth_date}
                helperText={errors.birth_date?.message}
              />
            </Box>
          </Stack>
          <Stack
            direction={{ lg: "row", xs: "column" }}
            spacing={2}
            sx={{ width: "100%" , gap: "10px"}}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { lg: "50%", xs: "100%" },
              }}
            >
              <label htmlFor="country_id">{t("Country")}</label>
              <select
                style={{
                  height: "40px",
                  borderRadius: "5px",
                  border: `1px solid ${theme.palette.divider}`,
                  color: theme.palette.text.primary,
                  width: "100%",
                  backgroundColor: theme.palette.background.default,
                  padding: "0 10px",
                }}
                {...register("country_id", {
                  required: t("Country is required"),
                })}
              >
                <option value="" disabled>
                  {t("Select Country")}
                </option>
                {countries?.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country_id && (
                <Typography color="error" variant="caption">
                  {errors.country_id.message}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { lg: "50%", xs: "100%" },
              }}
            >
              <label htmlFor="city_id">{t("City")}</label>
              <select
                style={{
                  height: "40px",
                  borderRadius: "5px",
                  border: `1px solid ${theme.palette.divider}`,
                  color: theme.palette.text.primary,
                  width: "100%",
                  backgroundColor: theme.palette.background.default,
                  padding: "0 10px",
                }}
                {...register("city_id", { required: t("City is required") })}
                disabled={!selectedCountry}
              >
                <option value="" disabled>
                  {selectedCountry
                    ? t("Select City")
                    : t("Select a country first")}
                </option>
                {filteredCities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              {errors.city_id && (
                <Typography color="error" variant="caption">
                  {errors.city_id.message}
                </Typography>
              )}
            </Box>
          </Stack>
          <Stack
            direction={{ lg: "row", xs: "column" }}
            spacing={2}
            sx={{ width: "100%" , gap: "10px"}}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "100%", md: "50%" },
              }}
            >
              <label htmlFor="gender">{t("Gender")}</label>
              <select
                style={{
                  height: "40px",
                  borderRadius: "5px",
                  border: `1px solid ${theme.palette.divider}`,
                  color: theme.palette.text.primary,
                  width: "100%",
                  backgroundColor: theme.palette.background.default,
                  padding: "0 10px",
                }}
                {...register("gender", { required: t("Gender is required") })}
              >
                <option value="" disabled>
                  {t("Select Gender")}
                </option>
                <option value="1">{t("Male")}</option>
                <option value="2">{t("Female")}</option>
              </select>
              {errors.gender && (
                <Typography color="error" variant="caption">
                  {errors.gender.message}
                </Typography>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "100%", md: "50%" },
              }}
            >
              <label htmlFor="image">{t("User Image")}</label>
              <input type="file" {...register("image")} accept="image/*" />
            </Box>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
               gab: "10px"
              
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { xs: "100%", md: "50%" },
              }}
            >
              <label>{t("Interests")}</label>
              {interesties?.length > 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  {interesties.map((interest) => (
                    <FormControlLabel
                      key={interest.id}
                      control={
                        <Checkbox
                          value={interest.id}
                          checked={selectedInterests.includes(Number(interest.id))}
                          onChange={(e) =>
                            handleInterestChange(
                              parseInt(e.target.value),
                              e.target.checked
                            )
                          }
                          color="primary"
                        />
                      }
                      label={interest.name}
                    />
                  ))}
                </Box>
              ) : (
                <Typography>{t("Loading interests...")}</Typography>
              )}
              {errors.interests && (
                <Typography color="error" variant="caption">
                  {errors.interests.message}
                </Typography>
              )}
            </Box>
          </Stack>
          <Button variant="contained" color="primary" type="submit">
            {action === "Add User" ? t("Add") : t("Edit")}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}