import React, { useMemo, useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import FollowerRow from "./components/FollowerRow";
import { Follower } from "./types/follower";
import { fetchFollowers } from "./services/follower";

function App() {
  const [username1, setUsername1] = useState<string>("");
  const [username1Pristine, setUsername1Pristine] = useState<boolean>(true);
  const [username2, setUsername2] = useState<string>("");
  const [username2Pristine, setUsername2Pristine] = useState<boolean>(true);
  const [commonFollowers, setCommonFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const username1RequireError = useMemo(() => {
    return username1 === "" && !username1Pristine;
  }, [username1, username1Pristine]);
  const username2RequireError = useMemo(() => {
    return username2 === "" && !username2Pristine;
  }, [username2, username2Pristine]);

  const handleSearch = async () => {
    if (username1 === "" || username2 === "") {
      setUsername1Pristine(false);
      setUsername2Pristine(false);
      return;
    }
    setLoading(true);
    const promises = [fetchFollowers(username1), fetchFollowers(username2)];
    try {
      const [followers1, followers2] = await Promise.all(promises);
      const followersFlagObj1 = followers1.reduce((acc, follower) => {
        acc[follower.login] = true;
        return acc;
      }, {} as { [key: string]: boolean });
      setCommonFollowers(
        followers2.filter((follower) => followersFlagObj1[follower.login])
      );
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 10, marginBottom: 10 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">Sheertex Coding Exercise</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="username1"
              label="Username 1"
              variant="standard"
              size="small"
              fullWidth
              required
              error={username1RequireError}
              helperText={
                username1RequireError ? "Username 1 is required" : " "
              }
              onBlur={() => setUsername1Pristine(false)}
              onChange={(e) => {
                setUsername1Pristine(false);
                setUsername1(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="username2"
              label="Username 2"
              variant="standard"
              size="small"
              fullWidth
              required
              error={username2RequireError}
              helperText={
                username2RequireError ? "Username 2 is required" : " "
              }
              onBlur={() => setUsername2Pristine(false)}
              onChange={(e) => {
                setUsername2Pristine(false);
                setUsername2(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <LoadingButton
              variant="outlined"
              size="large"
              fullWidth
              loading={loading}
              onClick={handleSearch}
            >
              Search
            </LoadingButton>
          </Grid>
          <Grid item xs={12}>
            <TableContainer
              sx={{ maxHeight: "calc(100vh - 300px)" }}
              component={Paper}
            >
              <Table stickyHeader aria-label="User Table">
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>Link</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(commonFollowers.length === 0 || loading) && (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Typography variant="subtitle1">
                          {loading ? "Loading data now" : "No data available"}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                  <>
                    {commonFollowers.map((follower, index) => (
                      <FollowerRow follower={follower} index={index} />
                    ))}
                  </>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
