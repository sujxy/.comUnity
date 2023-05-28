import { Box, Typography, useTheme } from "@mui/material";
import Buddy from "components/Buddy";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";

import { useEffect, useState } from "react";

const MembersPanel = ({ comId, members }) => {
  const { palette } = useTheme();

  const token = useSelector((state) => state.token);
  const [memberList, setMemberList] = useState(members);

  const getBuddies = async () => {
    const response = await fetch(
      `http://localhost:3001/comunity/${comId}/members`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    setMemberList(data);
  };

  useEffect(() => {
    getBuddies();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        variant="h5"
        color={palette.neutral.dark}
        fontWeight="bold"
        sx={{ mb: "1.5rem" }}
      >
        Members
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {memberList?.map((buddy) => (
          <Buddy
            key={buddy._id}
            buddyId={buddy._id}
            name={`${buddy.firstName} ${buddy.lastName}`}
            description={buddy.description}
            department={buddy.department}
            userPicturePath={buddy.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default MembersPanel;
