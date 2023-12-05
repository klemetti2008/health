import {Button, Stack, Typography} from '@mui/material';
import {useAuthContext} from 'src/auth/useAuthContext';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import {MajaClient} from "src/_clients";
import {useSnackbar} from "src/components/snackbar";
import {UIEvent, useState} from "react";

export default function PrivacyPolicySection() {
  const {logout, initialize} = useAuthContext();
  const {enqueueSnackbar} = useSnackbar()
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(true);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const {scrollHeight, scrollTop, clientHeight} = e.currentTarget
    console.log(scrollHeight, scrollTop, clientHeight)
    if (scrollHeight - scrollTop === clientHeight) {
      setHasScrolledToEnd(true);
    }
  };

  const acceptPrivacyPolicy = async () => {
    try {
      await MajaClient.put('/users/accept-policy')
      enqueueSnackbar('Privacy policy accepted', {variant: 'success'})
      initialize()
    } catch (error) {
      console.log(error)
      enqueueSnackbar('Error accepting privacy policy. Contact Support', {variant: 'error'})
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h3">Terms And Privacy</Typography>

      <Typography variant="subtitle1" sx={{color: 'text.secondary'}}>
        Please read and accept our terms and privacy policy
      </Typography>
      <Scrollbar sx={{height: 400}} onScroll={handleScroll}>
        <Typography variant="body1" textAlign="justify" sx={{px: 1.5}}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quam quisquam doloremque modi
          sapiente, doloribus consequuntur optio atque. Debitis quia, nam similique nesciunt quas
          asperiores minima repudiandae rerum veritatis error fugit enim magni alias magnam modi
          consectetur optio ex numquam inventore mollitia iste cupiditate vero aperiam delectus!
          Alias magnam exercitationem accusantium at a! Dolore minima voluptate eum fuga quis.
          Expedita at earum ex voluptatibus hic culpa, sequi porro debitis animi eligendi commodi
          ullam atque soluta cumque facere rerum autem mollitia nisi est qui iste tempore recusandae
          nesciunt. Iste aut odit consequatur earum minus, ipsum non quo nostrum quidem? Officia
          maxime velit expedita eligendi maiores praesentium, tempore, optio vel cumque quo eveniet
          veniam aut dicta? Aliquid, ad! Reiciendis illum, autem quo minus et placeat explicabo
          architecto debitis vero ullam nemo soluta necessitatibus molestias unde cumque ex aperiam
          porro rerum eum praesentium totam! Dolorum itaque iste eaque ipsum odio minus, aliquid
          inventore quae commodi quam excepturi officiis nulla laboriosam vero nesciunt optio
          dolorem laudantium. Quo id nostrum fugit assumenda odit possimus delectus nemo non,
          accusamus voluptatem officiis ad, obcaecati inventore repellat rem odio recusandae rerum
          eveniet veniam quas, consequatur ullam. Perspiciatis voluptate dolorem fugiat, ab sit in
          voluptates, blanditiis asperiores, earum necessitatibus iste eius. Sed rem corrupti
          reprehenderit dolorum nesciunt minima laboriosam ratione harum quibusdam, suscipit
          voluptates tempore rerum, totam deleniti. Est, praesentium? Ullam magnam dignissimos sit
          debitis laudantium dicta quisquam, quibusdam, ea assumenda labore recusandae, obcaecati
          placeat nemo. Ullam, praesentium facilis id ipsum fuga molestias ratione mollitia
          laboriosam nisi similique? Reprehenderit dicta magni numquam eligendi velit
          exercitationem, autem ratione minus quis error minima ullam. Alias libero sit temporibus
          rerum, doloribus repellendus dolorum quae, quibusdam illo fuga nam dolorem nulla maxime
          cum quis atque officia numquam similique recusandae eum porro quam, accusantium quidem?
          Repudiandae cupiditate tempore repellat dolorem deserunt commodi molestias laboriosam!
        </Typography>
      </Scrollbar>
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={logout} size="large" color="primary" variant="outlined">
          Reject
        </Button>
        <Button
          disabled={!hasScrolledToEnd}
          onClick={acceptPrivacyPolicy}
          size="large"
          color="primary"
          variant="contained"
        >
          Acccept
        </Button>
      </Stack>
    </Stack>
  );
}
