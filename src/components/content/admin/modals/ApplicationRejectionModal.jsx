import React, { useState } from "react";
import Textarea from "../../../shared/fields/Textarea";
import Button from "../../../shared/buttons/Button";
import CommonModal from "../../../shared/modals/CommonModal";
import { ADMIN_NEW_APPLICATIONS_PATH } from "../../../../constant/paths";
import { acceptOrRejectApplication } from "../../../../api/applicationAPIs";
import { useNavigate } from "react-router-dom";
import { APPLICATION_STATUSES } from "../../../../constant/general";
import { toast } from "react-toastify";

const ApplicationRejectionModal = ({
  isOpenRejectionModal,
  setIsOpenRejectionModal,
  id,
}) => {
  const [rejectionNote, setRejectionNote] = useState("");
  const [rejectionNoteErr, setRejectionNoteErr] = useState("");
  const [loadingReject, setLoadingReject] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRejectionNote(e.target.value);
  };

  const rejectApplication = () => {
    if (!rejectionNote) {
      setRejectionNoteErr("The reason for rejection needs to be mentioned.");
      return;
    }

    setLoadingReject(true);

    acceptOrRejectApplication(
      id,
      APPLICATION_STATUSES.APPLICATION_REJECTED,
      rejectionNote
    )
      .then(() => {
        setLoadingReject(false);
        toast.success("Application has been rejected.");
        navigate(ADMIN_NEW_APPLICATIONS_PATH);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoadingReject(false);
      });
  };

  return (
    <CommonModal
      title="Rejection of the application"
      desc="Are you sure that you need to reject this application?"
      isOpen={isOpenRejectionModal}
      setIsOpen={setIsOpenRejectionModal}
    >
      <div className="mt-5">
        <Textarea
          label="Rejection note *"
          name="rejectionNote"
          value={rejectionNote}
          handleChange={handleChange}
          error={rejectionNoteErr}
        />
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button
          variant="light"
          className="w-[100px]"
          handleButton={() => {
            setIsOpenRejectionModal(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="w-[100px]"
          isLoading={loadingReject}
          handleButton={() => rejectApplication(id)}
        >
          Confirm
        </Button>
      </div>
    </CommonModal>
  );
};

export default ApplicationRejectionModal;
