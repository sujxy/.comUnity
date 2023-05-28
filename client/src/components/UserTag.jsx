import { Box, Typography, styled } from "@mui/material";

const UserTag = ({ department }) => {
  const tag = {
    "Computer Engineering Department": "CS",
    "Electronics and Telecommunication Department": "ENTC",
    "Robotics and Automation Department": "RNA",
    "Information Technology Department": "IT",
    "Mechanical Engineering Department": "MECH",
    "Civil Engineering Department": "CIV",
  };
  const key = department;
  return (
    <Box
      width="auto"
      px=".25rem"
      height="12px"
      borderRadius="3px"
      textAlign="center"
      backgroundColor="green"
      color="white"
    >
      <Typography fontSize="8px">{tag[key]}</Typography>
    </Box>
  );
};

export default UserTag;
