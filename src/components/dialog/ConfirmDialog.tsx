import {useCallback, ReactNode, useState} from 'react';
// material
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from '@mui/material'
import {LoadingButton} from "@mui/lab";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  loading?: boolean;
  btnColor:
    | 'error'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | undefined;
  children: ReactNode;
  confirmText?: string;
  dismissText?: string;
  confirmPhrase?: string;
  //
  confirm: Function;
  dismiss: Function;
}

export default function ConfirmDialog({
  open,
  title,
  confirm,
  loading = false,
  dismiss,
  children,
  btnColor,
  confirmText,
  dismissText = '',
  confirmPhrase = '',
}: ConfirmDialogProps) {
  const [phrase, setPhrase] = useState('');

  const onPhraseChange = useCallback((e: any) => {
    const {value} = e.target;
    setPhrase(value);
  }, []);

  const onConfirm = useCallback(
    () => {
      if (confirmPhrase && phrase !== confirmPhrase) return;
      if (loading) return;
      setPhrase('');
      confirm();
    },
    [confirm, loading, confirmPhrase, phrase],
  );

  const onDismiss = useCallback(
    () => {
      dismiss();
    },
    [dismiss],
  );

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onDismiss}>
      {title && <DialogTitle>{title}</DialogTitle>}

      <DialogContent>
        {!!children && (
          <DialogContentText sx={{mb: 2, px: 1}} id="alert-dialog-description">
            {children}
          </DialogContentText>
        )}
        {confirmPhrase && (
          <TextField
            fullWidth
            onChange={onPhraseChange}
            placeholder={confirmPhrase}
            value={phrase}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onDismiss}>{dismissText || "Cancel"}</Button>
        {!!confirm && (
          <LoadingButton
            loading={loading}
            color={btnColor}
            disabled={phrase !== confirmPhrase}
            onClick={onConfirm}
            autoFocus
          >
            {confirmText || 'Confirm'}
          </LoadingButton>
        )}
      </DialogActions>
    </Dialog>
  );
}
