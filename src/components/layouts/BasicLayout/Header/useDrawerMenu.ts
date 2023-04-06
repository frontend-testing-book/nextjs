import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";

export function useDrawerMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const handleCloseMenu = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleOpenMenu = useCallback(() => {
    setIsOpen(true);
  }, []);
  useClickAway(menuRef, () => {
    if (!isOpen) return;
    handleCloseMenu();
  });
  const router = useRouter();
  useEffect(() => {
    handleCloseMenu();
  }, [handleCloseMenu, router.asPath]);
  return { menuRef, isOpen, handleCloseMenu, handleOpenMenu };
}
