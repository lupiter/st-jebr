import "./header.module.css";
import { ROUTES } from "../routes";
import { NavLink } from "react-router-dom";
import { Heading, Text, HStack, Image, Button } from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../components/ui/menu";

export function Header() {
  return (
    <HStack
      align="baseline"
      borderBottom="1px"
      borderBottomColor="gray.200"
      padding={2}
      paddingBottom={1}
      justifyContent="start"
    >
      <MenuRoot>
        <MenuTrigger>
          <Button>
            <Image src="/st-jebr/logo.svg" alt="Menu" width={30} height={30} />
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem asChild value="home">
            <NavLink
              to={ROUTES.HOME.toString()}
              style={({ isActive }) => {
                return {
                  textDecoration: isActive ? "underline" : "",
                };
              }}
            >
              Calculator
            </NavLink>
          </MenuItem>
          <MenuItem value="raglan">
          <NavLink
            to={ROUTES.RAGLAN.toString()}
            style={({ isActive }) => {
              return {
                textDecoration: isActive ? "underline" : "",
              };
            }}
          >
            Raglan Designer
          </NavLink>
          </MenuItem>
          <MenuItem value="card">
          <NavLink
            to={ROUTES.CARD.toString()}
            style={({ isActive }) => {
              return {
                textDecoration: isActive ? "underline" : "",
              };
            }}
          >
            Punch cards
          </NavLink>
          </MenuItem>
          <MenuItem value="radar">
          <NavLink
            to={ROUTES.RADAR.toString()}
            style={({ isActive }) => {
              return {
                textDecoration: isActive ? "underline" : "",
              };
            }}
          >
            Radar
          </NavLink>
          </MenuItem>
        </MenuContent>
      </MenuRoot>
      <Heading textAlign="center" color="brand.200">
        st-jebr
      </Heading>
      <Text role="caption" className="caption" textAlign="left" color="gray.400">
        stitch-(al)gebra
      </Text>
    </HStack>
  );
}
