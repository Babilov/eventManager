"use client";
import React from "react";
import { getProfileData } from "@/api/user.api";
import { useDataLoader } from "@/hooks/useDataLoader";
import { IUser } from "@/interfaces/user.interface";
import { Typography } from "@mui/material";
import Loader from "@/components/UI/Loader";
import ProfileInfo from "@/components/ProfileInfo";

const ProfilePage = () => {
  const { data, isLoading, error } = useDataLoader<IUser | null>(
    () => getProfileData(),
    [],
  );
  if (error) {
    return <Typography>Ошибка загрузки пользователя</Typography>;
  }

  return (
    <div>{isLoading ? <Loader /> : data && <ProfileInfo user={data} />}</div>
  );
};

export default ProfilePage;
