"use client";

import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { useBoolean } from "src/hooks/use-boolean";
import { useResponsive } from "src/hooks/use-responsive";

import Iconify from "src/components/iconify";

import Nav from "./nav";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

// ----------------------------------------------------------------------

export default function AccountLayout({ children }) {
  const mdUp = useResponsive("up", "md");

  const menuOpen = useBoolean();

  const router = useRouter();

  const { accessToken, loading } = useSelector((state) => state.auth);

  if (!accessToken) {
    router.push("/auth/login");
  }

  if (loading) {
    return null;
  }

  return (
    <>
      {mdUp ? (
        <Container sx={{ my: 5 }}>
          <Typography variant="h3">Account</Typography>
        </Container>
      ) : (
        <Box
          sx={{
            py: 2,
            mb: 5,
            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          <Container>
            <Button
              size="small"
              color="inherit"
              startIcon={<Iconify icon="carbon:menu" />}
              onClick={menuOpen.onTrue}
            >
              Account
            </Button>
          </Container>
        </Box>
      )}

      <Container>
        <Stack
          direction={{
            md: "row",
          }}
          alignItems={{
            md: "flex-start",
          }}
          sx={{
            mb: {
              xs: 8,
              md: 10,
            },
          }}
        >
          <Nav open={menuOpen.value} onClose={menuOpen.onFalse} />

          <Box
            sx={{
              flexGrow: 1,
              pl: { md: 8 },
              width: { md: `calc(100% - ${280}px)` },
            }}
          >
            {children}
          </Box>
        </Stack>
      </Container>
    </>
  );
}

AccountLayout.propTypes = {
  children: PropTypes.node,
};
