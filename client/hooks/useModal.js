import { useState } from 'react';

function useModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = e => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return { open, handleClose, handleOpen };
}

export default useModal;
