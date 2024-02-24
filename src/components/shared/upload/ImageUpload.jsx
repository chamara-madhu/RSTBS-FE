import React, { useCallback, useRef, useState } from "react";
import classNames from "classnames";
import { UploadCloud } from "feather-icons-react";

const allowFileTypes = ["image/jpeg", "image/png"];

const ImageUpload = ({
  setFile,
  value,
  existingValue,
  label,
  labelClass,
  deleteImage,
  allowMaxFileSize = 1024 * 1024 * 2, // 2MB
  showRequiredLabel = false,
}) => {
  const [fileErr, setFileErr] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const uploadInput = useRef(null);

  const handleUpload = useCallback(
    async (e) => {
      const file = e.target.files[0];

      if (file.size > allowMaxFileSize) {
        setFileErr("File size not allowed. Maximum size: 100KB.");
      } else if (!allowFileTypes.includes(file?.type)) {
        setFileErr("File type is not allowed");
      } else {
        setFile(e.target.files[0]);
        setFileErr("");
      }
    },
    [allowMaxFileSize, setFile]
  );

  const openImageUpload = () => {
    if (!uploadInput.current) return;
    uploadInput.current.click();
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDragOverAndEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    setIsDragging(true);
  };

  const onDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    let draggedData = e.dataTransfer;
    let file = draggedData.files;

    setFile(file[0]);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label
        className={classNames(
          "text-sm font-medium leading-[20px] text-pp-gray-700",
          labelClass
        )}
      >
        {label} {showRequiredLabel ? "*" : null}
      </label>
      {value || existingValue ? (
        <div className="flex justify-center">
          <div className="relative w-[75px] h-[75px]">
            <img
              src={existingValue || URL.createObjectURL(value)}
              // width="75"
              // height="75"
              className="object-cover w-full h-full rounded-full"
              alt="user profile image"
              // loading="eager"
              // decoding="async"
              // priority={false}
            />
            {/* <CloseIcon
              onClick={deleteImage}
              className="absolute bottom-[2px] w-5 h-5 p-1 bg-black rounded-full cursor-pointer right-[2px]"
            /> */}
          </div>
        </div>
      ) : (
        <div>
          <div
            onDragLeave={onDragLeave}
            onDragEnter={onDragOverAndEnter}
            onDragOver={onDragOverAndEnter}
            onDrop={onDrop}
            className={classNames(
              "flex flex-col items-center gap-4 py-4 px-6 self-stretch rounded-lg border ",
              isDragging
                ? "border-pp-primary-300 bg-pp-primary-25"
                : "border-pp-gray-400 bg-white"
            )}
          >
            <div className="flex flex-col items-center self-stretch gap-3">
              <div>
                <UploadCloud size={16} color="#667085" />
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="flex gap-1">
                  <button
                    type="button"
                    className="text-sm font-medium cursor-pointer text-pp-primary-700"
                    onClick={openImageUpload}
                  >
                    Click to upload
                  </button>
                  <span
                    className={
                      "text-sm " +
                      (isDragging ? "text-pp-primary-600" : "text-pp-gray-500")
                    }
                  >
                    or drag and drop
                  </span>
                </div>
                <input
                  className="hidden"
                  ref={uploadInput}
                  multiple
                  accept={allowFileTypes.join(",")}
                  onChange={handleUpload}
                  type="file"
                />
                <span
                  className={
                    "text-xs " +
                    (isDragging ? "text-pp-primary-600" : "text-pp-gray-500")
                  }
                >
                  {allowFileTypes
                    .map((type) => type.split("/")[1].toUpperCase())
                    .join(", ")}{" "}
                  (Max. {allowMaxFileSize / (1024 * 1024)} MB)
                </span>
              </div>
            </div>
          </div>
          {fileErr && <p className="mt-1 text-xs text-red-500">{fileErr}</p>}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
