import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Link,
  Container,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useRouter } from "next/router";

// Navアイテムのコンポーネント - 修正版
const NavItem = ({ children, href, isActive }) => {
  return (
    <Link
      as={NextLink}
      href={href}
      px={2}
      py={1}
      rounded={"md"}
      fontWeight={isActive ? "bold" : "medium"}
      color={isActive ? "brand.700" : "gray.600"}
      _hover={{
        textDecoration: "none",
        color: "brand.600",
      }}
    >
      {children}
    </Link>
  );
};

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();

  const menuItems = [
    { name: "ホーム", path: "/" },
    { name: "アンケート", path: "/questionnaire" },
    { name: "植物一覧", path: "/plants" },
    { name: "ランキング", path: "/ranking/popular" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <Box
      as="header"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"sm"}
      position="sticky"
      top={0}
      zIndex={10}
      w="100%"
    >
      <Container maxW="container.xl">
        <Flex
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          align={"center"}
          justify="space-between"
        >
          <Flex flex={{ base: 1 }} alignItems="center">
            <Link as={NextLink} href="/" _hover={{ textDecoration: "none" }}>
              <Flex align="center" cursor="pointer">
                <Text fontSize="2xl" mr={2}>
                  🌱
                </Text>
                <Text
                  fontWeight="bold"
                  fontSize="xl"
                  color="brand.900"
                  display={{ base: "none", md: "flex" }}
                >
                  植物推薦アプリ
                </Text>
                <Text
                  fontWeight="bold"
                  fontSize="lg"
                  color="brand.900"
                  display={{ base: "flex", md: "none" }}
                >
                  植物推薦
                </Text>
              </Flex>
            </Link>
          </Flex>

          {/* デスクトップナビゲーション */}
          <Stack
            direction={"row"}
            spacing={6}
            display={{ base: "none", md: "flex" }}
          >
            {menuItems.map((item) => (
              <NavItem
                key={item.path}
                href={item.path}
                isActive={router.pathname === item.path}
              >
                {item.name}
              </NavItem>
            ))}
          </Stack>

          {/* モバイルメニューボタン */}
          <Box display={{ base: "flex", md: "none" }}>
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Box>
        </Flex>

        {/* モバイルメニュー */}
        <Collapse in={isOpen} animateOpacity>
          <Box
            py={4}
            display={{ md: "none" }}
            borderTop={1}
            borderStyle={"solid"}
            borderColor={useColorModeValue("gray.200", "gray.700")}
          >
            <Stack as={"nav"} spacing={4}>
              {menuItems.map((item) => (
                <NavItem
                  key={item.path}
                  href={item.path}
                  isActive={router.pathname === item.path}
                >
                  {item.name}
                </NavItem>
              ))}
            </Stack>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
}
