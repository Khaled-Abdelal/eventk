import { useState } from 'react';

function useModal() {
  const [open, setOpen] = useState(false);

  const handleModalOpen = e => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  return [open, handleModalClose, handleModalOpen];
}

export default useModal;
