import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";
const Model = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className=" grid absolute top-0 z-40 backdrop-blur h-screen w-screen place-items-center " >
          <div className="m-auto z-50 relative p-4 min-h-[200px] min-w-[370px] bg-white">
            <div className=" flex  justify-end">
              <AiOutlineClose onClick={onClose} className=" text-2xl " />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,

    document.getElementById("modal-root")
  );
};

export default Model;
