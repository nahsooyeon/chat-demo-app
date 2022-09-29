import { User } from "firebase/auth";
import Image from "next/image";
import { memo } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";

type TProps = {
  logout: () => void;
  user: User;
};

const UserMenu = ({ logout, user }: TProps) => {
  return (
    <div className="flex flex-row justify-between w-full items-center px-2">
      <div className="flex flex-row items-center ">
        <Image
          className="rounded-full "
          src={user.photoURL as string}
          width={49}
          height={49}
          alt="img"
        />
        <span className="block font-semibold ml-2 sm:ml-4  text-base  sm:text-lg">
          {user?.displayName}
        </span>
      </div>
      <RiLogoutBoxRLine
        onClick={logout}
        className="rounded-full bg-secondaryWhite"
        size={25}
      />
    </div>
  );
};

export default UserMenu;
