import { ModalNormal } from 'components/modals'

interface Props {
  show: boolean
  setShow: (value: boolean | ((prev: boolean) => boolean)) => void
}

export default function Modal ({
  show,
  setShow
}: Props) {
  return (
    <ModalNormal show={show} setShow={setShow}>
      hoaaa
    </ModalNormal>
  )
}
