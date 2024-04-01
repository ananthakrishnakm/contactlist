import React from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from 'react-redux';
import { succesmodal } from '../redux/contactslice';


export const Success = () => {
    const {setmodal  } = useSelector((state) => state.contacts);
const dispatch =useDispatch()
    
const handleClose=()=>{
    dispatch(succesmodal(false)); 
}
  return (
    <div>
      <Modal
        open={setmodal}
        onClose={handleClose}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="success-modal-title" variant="h6" component="h2">
            {setmodal ? " Successfull !" : "  Successfull !"}
          </Typography>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ mt: 2 }}
            style={{ backgroundColor: "green" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};
