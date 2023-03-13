import React from "react";

import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { Follower } from "../types/follower";

interface FollowerRowProps {
  follower: Follower;
  index: number;
}

const FollowerRow = ({
  follower: { login, avatar_url, html_url },
  index,
}: FollowerRowProps) => {
  return (
    <TableRow key={login}>
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={2}>
          <Avatar alt={login} src={avatar_url} sx={{ width: 24, height: 24 }} />
          <Typography variant="caption" display="block" lineHeight="24px">
            {login}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Link href={html_url} target="_blank" rel="noopener">
          {html_url}
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default FollowerRow;
