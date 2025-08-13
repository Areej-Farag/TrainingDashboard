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
import { set, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useCitiesStore } from "../../Stores/CitiesStore";
import { useCountriesStore } from "../../Stores/CountriesStore";
import { useUserStore } from "../../Stores/UserStore";
import { useTranslation } from "react-i18next";
import useMerchantStore from "../../Stores/MerchantStore";
import useGovernmentStore from "../../Stores/GovernmentStore";

export default function UserPageForm() {
  const { id, type } = useParams();
  //type = user , merchant , government
  const navigate = useNavigate();
  const action = id ? "Edit User" : "Add User";
  const {
    users,
    interesties,
    getInteresties,
    addNewUser,
    updateUser,
    showUser,
  } = useUserStore();
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const { getCities, cities } = useCitiesStore();
  const { countries, getCountries } = useCountriesStore();
  const { addMerchant, showMerchant, editMerchant } = useMerchantStore();
  const { addGovernment, showGovernment, editGovernment } =
    useGovernmentStore();
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const { t } = useTranslation();
  const userType = [
    {
      value: "merchant",
      label: t("merchant"),
    },
    {
      value: "user",
      label: t("user"),
    },
    {
      value: "government",
      label: t("government"),
    },
  ];

  useEffect(() => {
    if (type === "user") {
      action === "Edit User" ? setTitle("Edit User") : setTitle("Add User");
    } else if (type === "merchant") {
      action === "Edit User"
        ? setTitle("Edit Merchant")
        : setTitle("Add Merchant");
    } else if (type === "government") {
      action === "Edit User"
        ? setTitle("Edit Government")
        : setTitle("Add Government");
    }
  }, [type]);

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
      owner_name: "",
      id_num: "",
      email: "",
      phone: "",
      gender: "",
      expiration_date: "",
      birth_date: "",
      country_id: "",
      city_id: "",
      type: "",
      is_private: "",
      status: "",
      interests: [],
      image: null,
      Store_logo: null,
      activity: "",
      commercial_register: "",
    },
  });
  const theme = useTheme();

  // Watch country_id to react to changes
  const watchedCountryId = watch("country_id");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (id) {
          let userData;
          switch (type) {
            case "merchant":
              {
                userData = await showMerchant(id);
                console.log("Merchant Data:", userData);
              }
              break;
            case "government":
              userData = await showGovernment(id);
              console.log("Government Data:", userData);
              break;
            case "user":
            default:
              userData = await showUser(id);
              console.log("User Data:", userData);
          }

          if (userData) {
            setUser(userData);
            console.log("Fetched user data:", userData);
          } else {
            console.error("User not found");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id, type, showUser, showMerchant, showGovernment]);

  useEffect(() => {
    getCities();
    getCountries();
    getInteresties();

    console.log("type:", type);
    console.log("id:", id);
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
      setValue("type", user.type || null);
      setValue("is_private", user.is_private || null);
      setValue("status", user.status || null);
      setValue("commercial_register", user.commercial_register || null);
      if (type === "merchant" || type === "government") {
        setValue("activity", user.activity || "");
        setValue("Store_logo", user.Store_logo || null);
        setValue("expiration_date", user.expiration_date || "");
        setValue("owner_name", user.owner_name || "");
        setValue("commercial_register", user.commercial_register || "");
        setValue("id_num", user.id_num || "");
      }
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
  const filteredCities =
    cities?.filter((city) => city.country_id === Number(selectedCountry)) || [];

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
      updatedInterests = selectedInterests.filter(
        (existingId) => existingId !== id
      );
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
    formData.append("type", data.type);
    formData.append("gender", data.gender || 1);
    formData.append("birth_date", data.birth_date);
    formData.append("age", calculateAge(data.birth_date).toString());
    formData.append("country_id", data.country_id);
    formData.append("city_id", data.city_id);
    formData.append("is_private", data.is_private);
    formData.append("status", data.status);
    if (type === "merchant" || type === "government") {
      formData.append("activity", data.activity);
      formData.append("id_num", data.id_num || null);
      formData.append("commercial_register", data.commercial_register || null);
      formData.append("Store_logo", data.Store_logo || null);
      formData.append("expiration_date", data.expiration_date || null);
      formData.append("owner_name", data.owner_name || null);
    }
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
      //switch case
      if (action === "Add User") {
        switch (type) {
          case "user": {
            const response = await addNewUser(formData);
            console.log("response:", response);
            if (response.id) {
              reset();
              navigate("/users");
            }
            break;
          }
          case "merchant": {
            const response2 = await addMerchant(formData);
            console.log("response:", response2);
            if (response2.id) {
              reset();
              navigate("/merchants");
            }
            break;
          }
          case "government": {
            const response3 = await addGovernment(formData);
            console.log("response:", response3);
            if (response3.data.id) {
              reset();
              navigate("/governmental");
            }
            break;
          }
        }
      } else if (action === "Edit User" && user?.id) {
        switch (type) {
          case "user": {
            const response = await updateUser(formData);
            console.log("response:", response);
            if (response.status === 200) {
              reset();
              navigate("/users");
            }
            break;
          }
          case "merchant": {
            const response2 = await editMerchant(formData);
            console.log("response:", response2);
            if (response2.message === "Merchant updated successfully") {
              reset();
              navigate("/merchants");
            }
            break;
          }
          case "government": {
            const response3 = await editGovernment(formData);
            console.log("response:", response3);
            if (response3.message === "governmental updated successfully") {
              reset();
              navigate("/governmental");
            }
            break;
          }
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
        {t(`${title}`)}
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        style={{ width: "100%" }}
      >
        <Stack spacing={2} sx={{ width: "100%", gap: "10px" }}>
          <Stack
            direction={{ lg: "row", xs: "column" }}
            spacing={2}
            sx={{ width: "100%", gap: "10px" }}
          >
            {(type === "merchant" || type === "government") && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: { lg: "50%", xs: "100%" },
                }}
              >
                <label htmlFor="name">
                  {type === "user" ? t("Name") : t("Store Name")}
                </label>
                <TextField
                  sx={{
                    width: "100%",
                  }}
                  {...register("name", {
                    required: t("Name is required"),
                  })}
                  placeholder={t("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Box>
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { lg: "50%", xs: "100%" },
              }}
            >
              <label htmlFor="name">
                {type === "user" ? t("Name") : t("Owner Name")}
              </label>
              <TextField
                sx={{
                  width: "100%",
                }}
                {...register("owner_name", { required: t("Name is required") })}
                placeholder={type === "user" ? t("Name") : t("Owner Name")}
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
            sx={{ width: "100%", gap: "10px" }}
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
            {(type === "merchant" || type === "government") && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: { lg: "50%", xs: "100%" },
                }}
              >
                <label htmlFor="expiration_date">{t("expiration_date")}</label>
                <TextField
                  type="date"
                  sx={{
                    width: "100%",
                  }}
                  {...register("expiration_date", {
                    required: t("expiration_date is required"),
                  })}
                  error={!!errors.expiration_date}
                  helperText={errors.expiration_date?.message}
                />
              </Box>
            )}
          </Stack>
          {(type === "merchant" || type === "government") && (
            <Stack
              direction={{ lg: "row", xs: "column" }}
              spacing={2}
              sx={{ width: "100%", gap: "10px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <label htmlFor="activity">{t("activity")}</label>
                <TextField
                  sx={{
                    width: "100%",
                    
                  }}
                  {...register("activity", {
                    required: t("activity is required"),
                  })}
                  placeholder={t("activity")}
                  error={!!errors.activity}
                  helperText={errors.activity?.message}
                />
              </Box>
            </Stack>
          )}
          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            {(type === "merchant" || type === "government") && (
              <>
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
                              checked={selectedInterests.includes(
                                Number(interest.id)
                              )}
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

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { lg: "50%", xs: "100%" },
                  }}
                >
                  <label htmlFor="id_num">{t("id_num")}</label>
                  <TextField
                    sx={{
                      width: "100%",
                    }}
                    {...register("id_num", {
                      required: t("id_num is required"),
                    })}
                    placeholder={t("id_num")}
                    error={!!errors.id_num}
                    helperText={errors.id_num?.message}
                  />
                </Box>
              </>
            )}
          </Stack>
          <Stack
            direction={{ lg: "row", xs: "column" }}
            spacing={2}
            sx={{ width: "100%", gap: "10px" }}
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

          {type === "user" && (
            <Stack
              direction={{ lg: "row", xs: "column" }}
              spacing={2}
              sx={{ width: "100%", gap: "10px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: { xs: "100%", lg: "50%" },
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
                  width: { xs: "100%", lg: "50%" },
                }}
              >
                <label htmlFor="type">{t("user type")}</label>
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
                  {...register("type", { required: t("type is required") })}
                >
                  <option value="" disabled>
                    {t("Select type")}
                  </option>
                  {userType.map((type) => (
                    <option value={type.value}>{type.label}</option>
                  ))}
                </select>
                {errors.type && (
                  <Typography color="error" variant="caption">
                    {errors.type.message}
                  </Typography>
                )}
              </Box>
            </Stack>
          )}
          <Stack
            direction={{ lg: "row", xs: "column" }}
            justifyContent={"space-between"}
            spacing={2}
            sx={{ width: "100%", gap: "10px" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { lg: "50%", xs: "100%" },
              }}
            >
              <label htmlFor="type">{t("Acount Type")}</label>
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
                {...register("is_private", { required: t("type is required") })}
              >
                <option value="" disabled>
                  {t("Acount Type")}
                </option>
                <option value="0">{t("Private")}</option>
                <option value="1">{t("Public")}</option>
              </select>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { lg: "50%", xs: "100%" },
              }}
            >
              <label htmlFor="status">{t("Acount Activity")}</label>
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
                {...register("status", { required: t("status is required") })}
              >
                <option value="" disabled>
                  {t("Select type")}
                </option>
                <option value="1">{t("Active")}</option>
                <option value="0">{t("Inactive")}</option>
              </select>
            </Box>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              gab: "10px",
            }}
          >
            {" "}
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
            {type === "user" && (
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
                            checked={selectedInterests.includes(
                              Number(interest.id)
                            )}
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
            )}
            {(type === "merchant" || type === "government") && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { lg: "50%", xs: "100%" },
                  }}
                >
                  <label htmlFor="Store_logo">{t("Store Logo")}</label>
                  <input
                    type="file"
                    sx={{
                      width: "100%",
                    }}
                    {...register("Store_logo", {
                      // required: t("store image is required"),
                    })}
                    placeholder={t("store image")}
                    error={!!errors.Store_logo}
                    helperText={errors.Store_logo?.message}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: { lg: "50%", xs: "100%" },
                  }}
                >
                  <label htmlFor="commercial_register">
                    {t("commercial register")}
                  </label>
                  <input
                    type="file"
                    sx={{
                      width: "100%",
                    }}
                    {...register("commercial_register", {
                      required: t("commercial register is required"),
                    })}
                    placeholder={t("commercial register")}
                    error={!!errors.commercial_register}
                    helperText={errors.commercial_register?.message}
                  />
                </Box>
              </>
            )}
          </Stack>

          <Button variant="contained" color="primary" type="submit">
            {action === "Add User" ? t("Add") : t("Edit")}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
