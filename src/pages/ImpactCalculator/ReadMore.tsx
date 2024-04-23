import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type ReadMoreTypographyProps = {
  text: string;
  charLimit?: number;
};

const ReadMore = ({ text, charLimit = 300 }: ReadMoreTypographyProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const displayText = isExpanded ? text : `${text.substring(0, charLimit)}...`;
  const shouldShowReadMore = text.length > charLimit;

  return (
    <Typography
      component="div"
      sx={{
        mb: 2,
        whiteSpace: "pre-wrap",
        color: "#000000",
        borderRadius: "10px",
      }}
    >
      {displayText}
      {shouldShowReadMore && (
        <Button onClick={toggleIsExpanded} sx={{ ml: 1 }}>
          {isExpanded ? "Read less" : "Read more"}
        </Button>
      )}
    </Typography>
  );
};

export default ReadMore;
