import Image from "next/image";
function Modal({ selectedImage }) {
  return (
    <div>
      <img
        src={selectedImage}
        alt="Enlarged image"
        className="z-50 h-auto transition-duration-200 transform ease-in scale-120"
      />
    </div>
  );
}

export default Modal;
