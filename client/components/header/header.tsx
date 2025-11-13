"use client";
import { useDispatch, useSelector } from "react-redux";
import "./header.scss";
import { RootState } from "@/store/store";
import { logout } from "@/store/slices/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const isAdmin = useSelector((state: RootState) => state.auth.isAdmin);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <header className="header">
      <Link className="header__logo" href="/">
        MyShop
      </Link>
      {!isAdmin ? (
        <button className="header__btn" onClick={() => router.push("/login")}>
          Login
        </button>
      ) : (
        <button className="header__btn" onClick={() => dispatch(logout())}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
