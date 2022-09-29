import { IoMdCloseCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { memo } from "react";

type TProps = {
  value: string;
  handler: (value: string) => void;
};

const SearchBar = ({ value, handler }: TProps) => {
  return (
    <div className="px-3">
      <div className="rounded-full border-borderGray border w-full my-3 flex items-center px-2 py-2">
        <FaSearch className="text-gray mr-2" width={16} height={16} />
        <input
          value={value}
          maxLength={16}
          placeholder="이메일 검색"
          onChange={(e) => {
            handler(e.target.value);
          }}
          className=""
        ></input>
        <IoMdCloseCircle
          onClick={(e) => handler("")}
          width={49}
          height={49}
          className="text-gray mr-0 ml-auto "
        />
      </div>
    </div>
  );
};

export default memo(SearchBar);
