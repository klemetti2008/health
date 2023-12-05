import {useEffect} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography} from "@mui/material";
import VerifyCodeForm from "./VerifyCodeForm";
import {useAuthContext} from "../../../auth/useAuthContext";
import {useSelector} from "../../../redux/store";
import {exchangeCodeSelector} from "../../../redux/slices/auth";


type VerifyCodeDialogProps = {
  open: boolean;
  onClose: () => void;
}

export default function VerifyCodeDialog({open, onClose}: VerifyCodeDialogProps) {
  const {user} = useAuthContext();

  const exchangeCode = useSelector(exchangeCodeSelector);

  useEffect(() => {
    if (exchangeCode) {
      onClose();
    }
  }, [exchangeCode, onClose]);

  return <Dialog open={open} onClose={onClose} maxWidth='sm'>
    <DialogTitle>Insert Verification Code</DialogTitle>
    <DialogContent>
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography variant="body2" color="text.secondary" sx={{width: '80%', textAlign: 'center'}}>
            Please Insert the Verification Code sent to your email <strong>{user?.email}</strong>
          </Typography>
        </Stack>
        <VerifyCodeForm/>
      </Stack>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
    </DialogActions>
  </Dialog>
}